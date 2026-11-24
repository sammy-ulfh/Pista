---
curso: "terminal-y-bash"
modulo: "terminal-y-bash/sintaxis"
leccion: "opciones-de-bash"
titulo: "Opciones de Bash"
orden: 7
minutos: 1
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 1
ejercicios: []
---

Options are settings that change shell and/or script behavior.

The __set__ command enables options within a script. At the point in the script where you want the options __to take effect__, use __set -o option-name__ or, in short form, __set -option-abbrev__. These two forms are equivalent:

- __set -o verbose__
- __set -v__

To __disable__ an option within a script, use set __+o option_name___ or __set -option-abbrev__.

- __set +o verbose__
- __set +v__

<img src="/apuntes/terminal-y-bash/001.webp" alt="Captura de los apuntes" width="906" height="198" decoding="async">

## Example 1

```shell
#!/bin/bash

# exit_on_error.sh
set -e

echo "Check non-existing file"
cat non-existing-file.txt 
echo "moving on"
```
>$ ./exit_on_error.sh
> 	Check non-existing file
> 	cat: non-existing-file.txt: No such file or directory

## Example 2

```shell
#!/bin/bash

# skip_error.sh
# default value is +e

echo "Check non-existing file"
cat non-existing-file.txt 
echo "moving on"
```
>$ ./skip_error.sh 
Check non-existing file
cat: non-existing-file.txt: No such file or directory
moving on
