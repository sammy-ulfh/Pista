---
curso: "hacking-etico-explotacion"
modulo: "hacking-etico-explotacion/gestores-de-contenido"
leccion: "joomla"
titulo: "Joomla"
orden: 9
minutos: 4.9
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 8
ejercicios: []
---

Ahora veremos cómo enumerar el gestor de contenido __Joomla__. Joomla es un sistema de gestión de contenidos (CMS) de código abierto que se utiliza para crear sitios web y aplicaciones en línea. Joomla es muy popular debido a su facilidad de uso y flexibilidad, lo que lo hace una opción popular para sitios web empresariales, gubernamentales y de organizaciones sin fines de lucro. 

Joomla es altamente personalizable y cuenta con una gran cantidad de extensiones disponibles, lo que permite a los usuarios añadir funcionalidades adicionales a sus sitios web sin necesidad de conocimientos avanzados de programación. Joomla también cuenta con una comunidad activa de desarrolladores y usuarios que comparten sus conocimientos y recursos para mejorar el CMS.

El proyecto utilizado en esta ocasión es`https://github.com/vulhub/vulhub/tree/master/joomla/CVE-2015-8562`.

Una de las herramientas que se utilizarán es __Joomscan__. Joomscan es una herramienta de línea de comandos diseñada específicamente para escanear sitios web que utilizan Joomla y buscar posibles vulnerabilidades y debilidades de seguridad. 

Joomscan utiliza una variedad de técnicas de enumeración para identificar información sobre el sitio web de Joomla, como la versión de Joomla utilizada, los plugins y módulos instalados y los usuarios registrados en el sitio. También utiliza una base de datos de vulnerabilidades conocidas, para buscar posibles vulnerabilidades en la instalación de Joomla.

Para utilizar Joomscan, tendremos que clonar su repositorio y dentro de él ejecutar el script de Perl.

Proyecto: `https://github.com/OWASP/joomscan`

```shell
perl joomscan.pl -u <URL>
```

Donde __<\URL>__ es la URL del sitio web que deseamos escanear. Joomscan escaneará el sitio web y nos proporcionará una lista detallada de posibles vulnerabilidades y debilidades de seguridad. 

Es importante considerar que Joomscan no es una herramienta infalible y puede generar __falsos positivos__ o __falsos negativos__. Por lo tanto, es importante utilizar Joomscan junto con otras herramientas y técnicas de seguridad para tener una imagen completa de la seguridad del sitio web de Joomla que estemos auditando.

## Practica

### Despliegue

Primeramente, tenemos que tener la carpeta del proyecto mencionada anteriormente. Una vez la tengamos, tendríamos que meternos a ella y desplegar el entorno.

```shell
docker-compose up -d
```

Esto nos desplegará todo el proyecto, el cual nos deja habilitada una base de datos y una página web:

<img src="/apuntes/hacking-etico-explotacion/joomla-001.webp" alt="Captura de los apuntes" width="1342" height="165" decoding="async">

Si vamos al navegador, veremos la página de la siguiente manera:

<img src="/apuntes/hacking-etico-explotacion/joomla-002.webp" alt="Captura de los apuntes" width="1339" height="640" loading="lazy" decoding="async">

### Enumeración

#### Joomscan

Tendremos que clonar el repositorio y entrar en él:

```shell
git clone https://github.com/OWASP/joomscan.git \
cd joomscan
```

Una vez con ello listo, bastaría con ejecutar con Perl el script:

```shell
perl joomscan.pl
```

Para empezar a enumerar un Joomla, tendríamos que utilizar esta herramienta y, con el parámetro -u, pasarle el enlace o URL del servicio:

```shell
perl joomscan.pl -u http://127.0.0.1:8080
```

Estos nos arrojan varios resultados. 

Vulnerabilidades:

<img src="/apuntes/hacking-etico-explotacion/joomla-003.webp" alt="Captura de los apuntes" width="984" height="613" loading="lazy" decoding="async">

Aquí podremos ver cómo, para la versión 3.4.5, son todas las vulnerabilidades que ha encontrado. 

Rutas o recursos encontrados:

<img src="/apuntes/hacking-etico-explotacion/joomla-004.webp" alt="Captura de los apuntes" width="580" height="259" loading="lazy" decoding="async">

En este caso vemos cómo está expuesto el panel de administrador y, por ende, podríamos entrar al mismo desde el navegador:

<img src="/apuntes/hacking-etico-explotacion/joomla-005.webp" alt="Captura de los apuntes" width="1328" height="648" loading="lazy" decoding="async">

Lo padre o interesante de esta herramienta es que además nos genera un reporte de todo lo encontrado. Nos genera una carpeta __reports/__ a la cual, al acceder, veremos lo siguiente:

<img src="/apuntes/hacking-etico-explotacion/joomla-006.webp" alt="Captura de los apuntes" width="798" height="167" loading="lazy" decoding="async">

Se genera una carpeta que tiene como nombre la URL a la cual le hemos realizado el escaneo y dentro de esta nuestro reporte, tanto en HTML como en TXT. 

Cambiamos el nombre de nuestro archivo HTML a index.html, para poder habilitar un servidor con PHP o Python y acceder al mismo desde el navegador y que nos muestre esta página, que sería nuestro reporte.

```python
python3 -m http.server 80
```

```php
php -S 127.0.0.1:80
```

<img src="/apuntes/hacking-etico-explotacion/joomla-007.webp" alt="Captura de los apuntes" width="1065" height="179" loading="lazy" decoding="async">

<img src="/apuntes/hacking-etico-explotacion/joomla-008.webp" alt="Captura de los apuntes" width="1341" height="647" loading="lazy" decoding="async">

Nos da distintas cosas y veremos cómo lo que está en verde son pestañas que podemos desplegar para ver con detalle lo encontrado. 

Para Joomla, en cuanto a enumeración, esto será todo; más adelante se verá cómo explotar dichas vulnerabilidades; por lo pronto, avanzaremos con la enumeración de otro gestor de contenido (CMS).
