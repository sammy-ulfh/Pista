/**
 * Obtiene los repositorios de apuntes de `datos/fuentes.json` y los deja en el commit fijado.
 *
 * - Si la carpeta no existe: clona el repositorio y hace checkout del `commit`.
 * - Si existe en el commit fijado: no hace nada.
 * - Si existe en otro commit: avisa y NO la cambia, salvo que se pida `--actualizar`.
 *
 * Solo hace `clone`, `fetch` y `checkout`: nunca edita archivos de `fuentes/` (es solo de lectura).
 */
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';

const ejecutar = promisify(execFile);

/**
 * Qué hacer con una fuente. Función pura (se prueba sin git).
 * @param {{ existe: boolean, commitActual: string | null, commitFijado: string | undefined, actualizar: boolean }} estado
 * @returns {'clonar' | 'listo' | 'avisar' | 'cambiar'}
 */
export function decidirAccion({ existe, commitActual, commitFijado, actualizar }) {
  if (!existe) return 'clonar';
  if (!commitFijado || (commitActual && mismoCommit(commitActual, commitFijado))) return 'listo';
  return actualizar ? 'cambiar' : 'avisar';
}

/** `true` si dos hashes (completos o abreviados) son el mismo commit. */
export function mismoCommit(/** @type {string} */ a, /** @type {string} */ b) {
  const [corto, largo] = a.length <= b.length ? [a, b] : [b, a];
  return corto.length >= 7 && largo.toLowerCase().startsWith(corto.toLowerCase());
}

/** @param {string[]} args @param {string} [cwd] */
async function git(args, cwd) {
  const { stdout } = await ejecutar('git', args, { cwd, maxBuffer: 10 * 1024 * 1024 });
  return stdout.trim();
}

/**
 * Obtiene todas las fuentes con repositorio. Devuelve avisos para el resumen.
 * @param {{ id: string, repositorio: string | null, commit?: string, carpeta: string }[]} fuentes
 * @param {{ raiz: string, actualizar: boolean, registrar?: (mensaje: string) => void }} opciones
 * @returns {Promise<string[]>} avisos
 */
export async function obtenerFuentes(fuentes, { raiz, actualizar, registrar = () => {} }) {
  /** @type {string[]} */
  const avisos = [];
  for (const fuente of fuentes) {
    if (!fuente.repositorio) continue;
    const carpeta = path.resolve(raiz, fuente.carpeta);
    const existe = existsSync(carpeta);
    const commitActual = existe ? await git(['rev-parse', 'HEAD'], carpeta).catch(() => null) : null;
    const accion = decidirAccion({ existe, commitActual, commitFijado: fuente.commit, actualizar });
    if (accion === 'clonar') {
      registrar(`Clonando ${fuente.repositorio} en ${fuente.carpeta}…`);
      await git(['clone', '--quiet', fuente.repositorio, carpeta]);
      if (fuente.commit) await git(['-c', 'advice.detachedHead=false', 'checkout', '--quiet', fuente.commit], carpeta);
    } else if (accion === 'cambiar') {
      registrar(`Cambiando ${fuente.carpeta} al commit ${fuente.commit}…`);
      await git(['fetch', '--quiet', 'origin'], carpeta).catch(() => {});
      await git(['-c', 'advice.detachedHead=false', 'checkout', '--quiet', /** @type {string} */ (fuente.commit)], carpeta);
    } else if (accion === 'avisar') {
      avisos.push(
        `«${fuente.id}»: ${fuente.carpeta} está en el commit ${commitActual?.slice(0, 7) ?? '¿?'} y datos/fuentes.json fija ` +
          `${fuente.commit}. No se cambió; usa \`npm run sincronizar -- --actualizar\` para moverlo.`,
      );
    }
  }
  return avisos;
}
