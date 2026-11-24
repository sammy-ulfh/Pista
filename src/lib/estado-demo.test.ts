/**
 * Pruebas del estado de la demo (`npm run probar`).
 * `localStorage` y `window` se simulan: uno que funciona, uno que falla en todo y uno que se llena.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CLAVE_ALMACEN,
  EVENTO_CAMBIO,
  _olvidarMemoria,
  activarPlan,
  cargarPerfil,
  actualizarEstado,
  alCambiarEstado,
  elegirArea,
  estadoInicial,
  guardarRespuestaDiagnostico,
  guardarRespuestaOrientacion,
  haySesion,
  leerEstado,
  marcarLeccionVista,
  normalizarEstado,
  reiniciarDemo,
  tienePlanActivo,
} from './estado-demo';

/** Un `localStorage` en memoria que se comporta como el del navegador. */
function almacenQueFunciona(): Storage {
  const datos = new Map<string, string>();
  return {
    get length() {
      return datos.size;
    },
    key: (i: number) => [...datos.keys()][i] ?? null,
    getItem: (clave: string) => datos.get(clave) ?? null,
    setItem: (clave: string, valor: string) => void datos.set(clave, String(valor)),
    removeItem: (clave: string) => void datos.delete(clave),
    clear: () => datos.clear(),
  };
}

/** Un `localStorage` que lanza un error en cada operación (modo privado, bloqueado por el navegador…). */
function almacenQueFalla(): Storage {
  const fallar = () => {
    throw new DOMException('Bloqueado', 'SecurityError');
  };
  return { length: 0, key: fallar, getItem: fallar, setItem: fallar, removeItem: fallar, clear: fallar };
}

/** Simula `window` con un EventTarget de verdad. */
function simularVentana() {
  const ventana = new EventTarget();
  vi.stubGlobal('dispatchEvent', ventana.dispatchEvent.bind(ventana));
  vi.stubGlobal('addEventListener', ventana.addEventListener.bind(ventana));
  vi.stubGlobal('removeEventListener', ventana.removeEventListener.bind(ventana));
  return ventana;
}

/** Como si el usuario recargara la página: se pierde la memoria, queda solo lo guardado. */
const recargar = () => _olvidarMemoria();

beforeEach(() => {
  simularVentana();
  _olvidarMemoria();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('con localStorage funcionando', () => {
  beforeEach(() => vi.stubGlobal('localStorage', almacenQueFunciona()));

  it('sin nada guardado, empieza con el estado inicial', () => {
    expect(leerEstado()).toEqual(estadoInicial());
    expect(tienePlanActivo()).toBe(false);
  });

  it('activarPlan sobrevive a una recarga', () => {
    activarPlan();
    recargar();
    expect(tienePlanActivo()).toBe(true);
    expect(JSON.parse(localStorage.getItem(CLAVE_ALMACEN) ?? '{}').planActivo).toBe(true);
  });

  it('reiniciarDemo desactiva el plan y borra todo', () => {
    actualizarEstado((e) => {
      e.planActivo = true;
      e.leccionesVistas.push('tus-primeros-clientes/cliente-ideal');
      e.areaElegida = 'conseguir-clientes';
    });
    reiniciarDemo();
    expect(leerEstado()).toEqual(estadoInicial());
    expect(localStorage.getItem(CLAVE_ALMACEN)).toBeNull();
    recargar();
    expect(tienePlanActivo()).toBe(false);
  });

  it('leerEstado devuelve una copia: cambiarla no cambia lo guardado', () => {
    const copia = leerEstado();
    copia.planActivo = true;
    expect(tienePlanActivo()).toBe(false);
  });

  it('JSON dañado: empieza de cero sin romperse', () => {
    localStorage.setItem(CLAVE_ALMACEN, '{esto no es json');
    expect(leerEstado()).toEqual(estadoInicial());
  });

  it('guarda cada respuesta de los cuestionarios y el área elegida, y sobreviven a una recarga', () => {
    guardarRespuestaOrientacion('carrera', 'negocios');
    guardarRespuestaOrientacion('carrera', 'otra'); // cambiar de opción reemplaza la anterior
    guardarRespuestaDiagnostico('conseguir-clientes', 'oferta', 'idea');
    guardarRespuestaDiagnostico('conseguir-clientes', 'tiempo', '1-2');
    guardarRespuestaDiagnostico('linux', 'uso', 'nunca');
    elegirArea('conseguir-clientes');
    recargar();
    const estado = leerEstado();
    expect(estado.orientacion).toEqual({ carrera: 'otra' });
    expect(estado.diagnosticos).toEqual({ 'conseguir-clientes': { oferta: 'idea', tiempo: '1-2' }, linux: { uso: 'nunca' } });
    expect(estado.areaElegida).toBe('conseguir-clientes');
  });

  it('marcarLeccionVista guarda la lección y el día local, sin repetir, y sobrevive a una recarga', () => {
    // 23:30 del 23 de noviembre (hora local): cuenta para el 23, no para el día siguiente en UTC.
    marcarLeccionVista('tus-primeros-clientes/cliente-ideal', new Date(2026, 10, 23, 23, 30));
    marcarLeccionVista('tus-primeros-clientes/cliente-ideal', new Date(2026, 10, 23, 23, 45));
    marcarLeccionVista('tus-primeros-clientes/donde-encontrarlo', new Date(2026, 10, 24, 8, 0));
    recargar();
    const estado = leerEstado();
    expect(estado.leccionesVistas).toEqual(['tus-primeros-clientes/cliente-ideal', 'tus-primeros-clientes/donde-encontrarlo']);
    expect(estado.diasEstudio).toEqual(['2026-11-23', '2026-11-24']);
  });

  it('cargarPerfil: respuestas y área del perfil, plan sin activar y sin progreso previo', () => {
    activarPlan();
    marcarLeccionVista('x/y', new Date(2026, 10, 23));
    cargarPerfil({ id: 'mariana', area: 'conseguir-clientes', respuestasOrientacion: { carrera: 'negocios' }, respuestasDiagnostico: { tiempo: '1-2' } });
    recargar();
    expect(leerEstado()).toEqual({
      ...estadoInicial(),
      perfil: 'mariana',
      orientacion: { carrera: 'negocios' },
      diagnosticos: { 'conseguir-clientes': { tiempo: '1-2' } },
      areaElegida: 'conseguir-clientes',
    });
  });

  it('otra versión del estado: se descarta', () => {
    localStorage.setItem(CLAVE_ALMACEN, JSON.stringify({ version: 99, planActivo: true }));
    expect(tienePlanActivo()).toBe(false);
  });
});

describe('con localStorage fallando en todo', () => {
  beforeEach(() => vi.stubGlobal('localStorage', almacenQueFalla()));

  it('leer no lanza errores', () => {
    expect(() => leerEstado()).not.toThrow();
    expect(leerEstado()).toEqual(estadoInicial());
  });

  it('el plan se activa en memoria aunque no se pueda guardar', () => {
    expect(() => activarPlan()).not.toThrow();
    expect(tienePlanActivo()).toBe(true);
  });

  it('reiniciar no lanza errores y limpia la memoria', () => {
    activarPlan();
    expect(() => reiniciarDemo()).not.toThrow();
    expect(tienePlanActivo()).toBe(false);
  });
});

describe('cuando acceder a localStorage lanza un error', () => {
  it('se usa la memoria', () => {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('Bloqueado', 'SecurityError');
      },
    });
    try {
      activarPlan();
      expect(tienePlanActivo()).toBe(true);
    } finally {
      // Se quita la propiedad simulada para no afectar a las demás pruebas.
      delete (globalThis as { localStorage?: Storage }).localStorage;
    }
  });
});

describe('con localStorage lleno (solo falla al escribir)', () => {
  it('el cambio vive en memoria', () => {
    const almacen = almacenQueFunciona();
    almacen.setItem = () => {
      throw new DOMException('Lleno', 'QuotaExceededError');
    };
    vi.stubGlobal('localStorage', almacen);
    activarPlan();
    expect(tienePlanActivo()).toBe(true);
  });
});

describe('evento estado-demo:cambio', () => {
  beforeEach(() => vi.stubGlobal('localStorage', almacenQueFunciona()));

  it('se emite al activar el plan y al reiniciar', () => {
    const recibidos: boolean[] = [];
    globalThis.addEventListener(EVENTO_CAMBIO, (e) => recibidos.push((e as CustomEvent).detail.planActivo));
    activarPlan();
    reiniciarDemo();
    expect(recibidos).toEqual([true, false]);
  });

  it('alCambiarEstado avisa y se puede dejar de escuchar', () => {
    const funcion = vi.fn();
    const dejar = alCambiarEstado(funcion);
    activarPlan();
    expect(funcion).toHaveBeenCalledWith(expect.objectContaining({ planActivo: true }));
    dejar();
    reiniciarDemo();
    expect(funcion).toHaveBeenCalledTimes(1);
  });
});

describe('normalizarEstado', () => {
  it('arregla campo por campo lo que esté dañado', () => {
    const estado = normalizarEstado({
      version: 1,
      perfil: 42,
      orientacion: { meta: 'clientes', malo: 3 },
      diagnosticos: { 'conseguir-clientes': { p1: 'a', p2: null } },
      areaElegida: 'conseguir-clientes',
      planActivo: 'sí',
      leccionesVistas: ['a/b', 'a/b', 7],
      diasEstudio: 'hoy',
    });
    expect(estado).toEqual({
      ...estadoInicial(),
      orientacion: { meta: 'clientes' },
      diagnosticos: { 'conseguir-clientes': { p1: 'a' } },
      areaElegida: 'conseguir-clientes',
      leccionesVistas: ['a/b'],
    });
  });
});

describe('haySesion (qué cabecera se ve)', () => {
  it('sin nada, o solo con la orientación respondida, no hay sesión', () => {
    expect(haySesion(estadoInicial())).toBe(false);
    expect(haySesion({ ...estadoInicial(), orientacion: { carrera: 'negocios' } })).toBe(false);
    expect(haySesion({ ...estadoInicial(), diagnosticos: { 'conseguir-clientes': {} } })).toBe(false);
  });

  it('hay sesión con un área elegida, algún diagnóstico respondido o el plan activo', () => {
    expect(haySesion({ ...estadoInicial(), areaElegida: 'conseguir-clientes' })).toBe(true);
    expect(haySesion({ ...estadoInicial(), diagnosticos: { 'conseguir-clientes': { oferta: 'idea' } } })).toBe(true);
    expect(haySesion({ ...estadoInicial(), planActivo: true })).toBe(true);
  });
});
