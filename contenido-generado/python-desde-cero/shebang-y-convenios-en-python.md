---
curso: "python-desde-cero"
modulo: "python-desde-cero/fundamentos"
leccion: "shebang-y-convenios-en-python"
titulo: "Shebang y convenios en Python"
orden: 4
minutos: 5.1
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 7
ejercicios: []
---

En el desarrollo con Python, el shebang y los convenios de codificación son aspectos importantes que facilitan la escritura de scripts claros y portables.

*Shebang en Python:*

El shebang es una linea que se incluye al principio de un script ejecutable para indicar al sistema operativo con qué intérprete debe ejecutarse el archivo. En los scripts de Python, el shebang común es:

```text
#!/usr/bin/env python3
```

Esta línea le dice al sistema que utilice el entorno (*env*) para encontrar el intérprete de Python 3 y ejecutar el script con él. Es fundamental para asegurar que el script se ejecute con Python 3 en sistemas donde Python 2 todavía está presente.

En Linux, el ejecutar */usr/bin/env* nos mostrará todas las variables de entorno en nuestro sistema. Y en este caso, al ejecutar */usr/bin/env python3*, nos ejecutaría el intérprete de comandos de python3.

Es por ello que al colocarlo de la manera indicada en nuestro script estaríamos asegurando que se ejecute con el intérprete indicado, ya que lo busca entre las rutas que están almacenadas en el *PATH*, en dado caso que su ruta sea distinta a */usr/bin/python3*. 

Más que nada es para evitar errores de cara a una persona que tenga almacenado el binario de *Python 3* en otra ruta.

De esta manera si tuviésemos un script para imprimir el inigualable Hello, World!, al agregar el shebang podríamos simplemente darle permisos de ejecución y ejecutarlo como un archivo y sin problemas se ejecutaría con Python 3.

```text
#!/usr/bin/env python3

print("Hello, World!")
```

*Sin shebang:*

<img src="/apuntes/python-desde-cero/img-007.webp" alt="Captura de los apuntes" width="832" height="266" decoding="async">

*Con shebang:*

<img src="/apuntes/python-desde-cero/img-008.webp" alt="Captura de los apuntes" width="491" height="268" loading="lazy" decoding="async">


*Convenios en Python:*

Los convenios de codificación son un conjunto de recomendaciones que guían a los desarrolladores de Python para escribir código claro y consistente. El más conocido es <mark>PEP 8</mark>, que abarca:

- *Nombres de variables:* Utilizar '*lower_case_with_underscores*' para nombres de variables y funciones, '*UPPER_CASE_WITH_UNDERSCORES*' para constantes y '*CamelCase*' para clases.
  </br>
- *Longitud de Línea:* Limitar las líneas a 79 caracteres para código y 72 para comentarios y docstrings.
  </br>
- *Indentación:* Usar 4 espacios por nivel de indentación.
  </br>
- *Espacios en blanco:* Seguir las prácticas recomendadas sobre el uso de espacios en blanco, no incluir espacios adicionales en listas, funciones y argumentos de funciones.
  </br>
- *Importaciones:* Las importaciones deben estar en líneas separadas y agrupadas en sl siguiente orden: módulos de la biblioteca estándar, módulos de terceros y luego módulos locales.
  </br>
-  *Compatibilidad entre Python 2 y 3:*  Aunque Python 2 ha llegado al final de su vida útil, algunos convenios pueden seguirse para mantener la compatibilidad.

El cumplimiento de estos convenios no solo mejora la legibilidad del código, sino que también facilita la colaboración entre desarrolladores y el mantenimiento a largo plazo del software.

El uso adecuado del shebang y la adhesión a los convenios de Python son señales de un desarrollo cuidadoso y profesional. Integrar estos aspectos en tus prácticas de codificación es crucial para el desarrollo de software efectivo y eficiente en Python.

*Representación de los convenios:*

<img src="/apuntes/python-desde-cero/img-011.webp" alt="Captura de los apuntes" width="671" height="653" loading="lazy" decoding="async">

Además, es importante saber que en cuanto a posibles confusiones deberíamos tener cuidado con las letras **l (ele minúscula)**, **O (o mayúscula)** y **I (i mayúscula)**.

Esto es debido a que dependiendo de la fuente de texto con la que cuenta el sistema podrían ser confundidas fácilmente, o la **O** confundida con el número **0**.

Además, existe también una forma recomendada para crear variables protegidas, que se utilizaran en cuanto a la implementación de clases:

<img src="/apuntes/python-desde-cero/img-012.webp" alt="Captura de los apuntes" width="395" height="151" loading="lazy" decoding="async">

O de otra forma, las variables o métodos privados:

<img src="/apuntes/python-desde-cero/img-013.webp" alt="Captura de los apuntes" width="355" height="145" loading="lazy" decoding="async">


*Scripts como módulos:*

En *Python 3* a los **scripts** les podremos considerar *módulos*, por ende cuando ejecutemos un script, este automáticamente será considerado el módulo principal, a diferencia de  los scripts agregados o importados a este.

Además, tenemos una forma de validarlo:

<img src="/apuntes/python-desde-cero/img-009.webp" alt="Captura de los apuntes" width="422" height="319" loading="lazy" decoding="async">

De esta forma, el contenido del condicional solo se ejecutará si el script es ejecutado directamente, considerándose así el módulo principal o main, y no como un tercero.

Entonces, para realizar una validación de como sería, al no considerarse un módulo principal importándolo desde otro script, sería de la siguiente manera:

<img src="/apuntes/python-desde-cero/img-010.webp" alt="Captura de los apuntes" width="581" height="566" loading="lazy" decoding="async">

Como vemos, al cada script ser considerado directamente un módulo se importa de forma sencilla. En este caso solo agregamos el nombre, ya que *script.py* se encuentra en el mismo directorio del script *test.py* el cual ejecutamos directamente.

De esta manera, basándonos en necesidades propias, podríamos crear script para ejecutar tanto como módulo principal y como módulo importado. Dándonos una mayor cantidad de posibilidades  en proyectos que realicemos.
