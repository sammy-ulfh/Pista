---
curso: "python-practico"
modulo: "python-practico/biblioteca-estandar"
leccion: "manejo-de-fechas-y-horas"
titulo: "Manejo de fechas y horas"
orden: 1
minutos: 3.3
idioma: "es"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 7
ejercicios: []
---

1. **Introducción**

	La biblioteca *datetime* en Python es una de las principales herramientas a trabajar con fechas y horas. Aquí hay algunos aspectos clave sobre la biblioteca.

	- *Tipos de Datos Principales:* *datetime* incluye varios tipos de datos, como *date* (para fechas), *time* (para horas), *datetime* (para fechas y horas combinadas) y *timedelta* (para representar diferencias de tiempo).
	- *Manipulación de Fechas y Horas:* Permite realizar operaciones como sumar o restar días, semanas, o meses en una fecha, comparar fechas o extraer componentes como el día, mes o año de una fecha específica.
	- *Zonas Horarias:* A través del módulo *pytz* que se integra con *datetime*, se pueden manejar fechas y horas en diferentes zonas horarias, lo que es crucial para aplicaciones que requieren precisión a nivel global.
	- *Formateo y Análisi:* *datetime* permite convertir fechas y horas a string y viceversa, utilizando códigos de formato específicos. Esto es útil para mostrar fechas y horas en formatos legibles o para parsear string que representan fechas/horas.
	- *Facilidad de Uso:* A pesa de su potencia y flexibilidad, datetime es relativamente fácil de usar, lo que la hace accesible incluso para programadores principiantes.
	- *Amplia Aplicación:* Desde registros de eventos hasta cálculos de períodos de tiempo, datetime es indispensable en una variedad de aplicaciones, como sistemas de reservas, análisis de datos temporales, y más.

	En resumen, datetime es una biblioteca integral y robusta para el manejo de fechas y horas en Python, ofreciendo una amplia gama de funcionalidades esenciales para el manejo de datos temporales en la programación.
	</br>
2. **Práctica**

	Con todo lo anterior en mente, ahora crearíamos un nuevo archivo y en este importaríamos la librería *datetime*:

	<img src="/apuntes/python-practico/img-683.webp" alt="Captura de los apuntes" width="258" height="76" decoding="async">

	Con esta librería ahora gracias a *.datetime.now()* podremos obtener la fecha actual y almacenarla en una variable para después mostrarla:

	<img src="/apuntes/python-practico/img-684.webp" alt="Captura de los apuntes" width="436" height="316" loading="lazy" decoding="async">

	La forma en que se mostrara por convenio es año-mes-día hora:minuto:segundos

	Nosotros también podríamos crear una fecha utilizando *date()*, esta sería siguiendo el convenio anterior:

	<img src="/apuntes/python-practico/img-685.webp" alt="Captura de los apuntes" width="453" height="310" loading="lazy" decoding="async">

	Así como hemos generado una fecha, también podríamos generar una hora, con *time()*:

	<img src="/apuntes/python-practico/img-686.webp" alt="Captura de los apuntes" width="414" height="320" loading="lazy" decoding="async">

	Además, también es posible generar una fecha y hora en conjunto con *datetime()*:

	<img src="/apuntes/python-practico/img-687.webp" alt="Captura de los apuntes" width="650" height="313" loading="lazy" decoding="async">

	Con el ejemplo, en el que extraemos la hora actual, de esta misma podremos extraer con ciertas propiedades todo de manera individual:

	<img src="/apuntes/python-practico/img-688.webp" alt="Captura de los apuntes" width="825" height="343" loading="lazy" decoding="async">

	Teniendo como resultado:

	<img src="/apuntes/python-practico/img-689.webp" alt="Captura de los apuntes" width="406" height="73" loading="lazy" decoding="async">
