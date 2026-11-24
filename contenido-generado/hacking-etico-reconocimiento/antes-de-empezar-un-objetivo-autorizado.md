---
curso: "hacking-etico-reconocimiento"
modulo: "hacking-etico-reconocimiento/escaneo-de-red"
leccion: "antes-de-empezar-un-objetivo-autorizado"
titulo: "Antes de empezar: un objetivo autorizado"
orden: 1
minutos: 3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 6
ejercicios: []
---

La plataforma **Hackerone** es una plataforma de **BugBounty** que permite a empresas y organizaciones que desean ser auditadas, "conectar" con hackers éticos para encontrar vulnerabilidades de seguridad en sus sistemas y aplicaciones de forma legal. 

Antes de iniciar una auditoria en esta plataforma, es fundamental fijar un objetivo claro, además de definir el alcance de la auditoria. Esto se logra a través del concepto "**scope**", que establece los límites de la auditoria, así como los sistemas y aplicaciones que pueden ser auditados.

Enlace a [Hackerone](https://hackerone.com)
## Práctica

Primero tendremos que registrarnos y loguearnos. 

Una vez hecho esto, podremos ir al apartado de hacktivity, aquí veremos una serie de vulnerabilidades que se llegaron a encontrar por parte de usuarios y en algunas veremos incluso la cantidad de dinero que les ha pagado la empresa a las personas que han encontrado dicha vulnerabilidad.

<img src="/apuntes/hacking-etico-reconocimiento/001.webp" alt="Captura de los apuntes" width="1739" height="879" decoding="async">

De la forma que funciona es que un usuario encuentra una vulnerabilidad y genera un reporte para la empresa, donde se desenvuelve una comunicación para arreglar esta vulnerabilidad y finalmente, si esta empresa tiene un programa de bounty serás recompensado. Si presionamos en una de estas, podremos ver incluso cómo fue el proceso de su comunicación, en algunos casos de una forma detallada y en otros de una muy general. 

Mostrando así el proceso que llevaron a cabo hasta arreglar la vulnerabilidad, finalmente lo que se hace es cerrar el reporte una vez que ha sido reparado y con ello ya es cuando todo esto se muestra en la plataforma en el apartado que hemos revisado.

<img src="/apuntes/hacking-etico-reconocimiento/002.webp" alt="Captura de los apuntes" width="1558" height="764" loading="lazy" decoding="async">

Ahora podremos irnos al apartado de opportunities, de todas las oportunidades en hackerone, no todas son pagadas en caso de que encontremos alguna vulnerabilidad, para asegurarnos de visualizar únicamente en las que llegan a dar compensación, tendríamos que seleccionar **Offers retesting**:

<img src="/apuntes/hacking-etico-reconocimiento/003.webp" alt="Captura de los apuntes" width="1715" height="865" loading="lazy" decoding="async">

Si checamos una como la de **Braze**, primero veremos cómo son las recompensas en este caso:

<img src="/apuntes/hacking-etico-reconocimiento/004.webp" alt="Captura de los apuntes" width="817" height="461" loading="lazy" decoding="async">

Además, podremos ver los **scope exclusions**, estos son los tipos de vulnerabilidades que no se considerarían en el bounty program en caso de encontrarse:

<img src="/apuntes/hacking-etico-reconocimiento/005.webp" alt="Captura de los apuntes" width="840" height="206" loading="lazy" decoding="async">

<img src="/apuntes/hacking-etico-reconocimiento/006.webp" alt="Captura de los apuntes" width="1219" height="842" loading="lazy" decoding="async">

Realmente esto nos dice toda la información de lo que podremos hacer, en qué apartados o incluso dominios y subdominios.
