---
curso: "administracion-linux"
modulo: "administracion-linux/terminal"
leccion: "buscar-archivos"
titulo: "Buscar archivos"
orden: 14
minutos: 0.8
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

- __find__ - look for files and directories with given criterias

> find \[-H] \[-L] \[-P] \[-D debugopts] \[-Olevel] \[path...] \[expression]


```text
$ find / -name hosts
$ find /home -user user

### Equal commands below:
$ find /tmp -name core -type f -exec rm {} \; 
$ find /tmp -name core -type f -print | xargs /bin/rm -
```

__find__ command has a lot of useful options. Please use __man find__ to get acquainted with all of them.

- __locate__ file in filesystem

__locate__ - find files and directories with given name

```text
$ locate passwd
/etc/passwd
```

- __grep__

__grep__ - print lines matching a pattern

If you need to find files in HOME directory that contains a word "fun", you could use the next command:

```text
$ grep -r "fun" ~
/home/vagrant/.bash_profile:# Get the aliases and functions
/home/vagrant/.bashrc:# User specific aliases and functions
```

> __grep__ is a very powerful and customizable command with a lot of opportunities, such as using of regular expressions.
