---
curso: "administracion-linux"
modulo: "administracion-linux/monitoreo"
leccion: "procesos"
titulo: "Procesos"
orden: 29
minutos: 0.7
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 2
ejercicios: []
---

## Task list

__top__ - view a dynamically updating list of running processes

<img src="/apuntes/administracion-linux/top.webp" alt="Top" width="1254" height="324" decoding="async">

## View processes

__ps__ - view a list of running processes

<img src="/apuntes/administracion-linux/ps.webp" alt="Ps" width="1248" height="143" loading="lazy" decoding="async">

## Kill processes

__kill__ - allow to stop or terminate running processes

```text
$ kill 156
$ kill -9 156 

#killall – kill processes by name
#Example
$ killall top
$ killall -9 top 
$ killall –KILL top
```
