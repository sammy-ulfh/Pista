---
curso: "administracion-linux"
modulo: "administracion-linux/terminal"
leccion: "comprimir-y-descomprimir"
titulo: "Comprimir y descomprimir"
orden: 16
minutos: 1.2
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 0
ejercicios: []
---

## zip/unzip

__zip__ - package and  compress  (archive) files
__unzip__ - list, test and extract compressed files in a ZIP archive

```text
$ zip -rp <file>.zip /path/to/
# compress folder into .zip

$ unzip <file>.zip
# extract files in current location from .zip
```

> __zip__  and __unzip__ commands have  a lot of useful options. Please  use man zip or man unzip to get acquainted with all of them 

## TAR

__tar__ - saves  many files together into a single tape or disk archive, and can restore individual files from the archive.

```text
$ tar -cvf <file>.tar path/to/
$ tar -xvf <file>.tar
$ tar -tf <file>.tar
$ tar -cvzf <file>.tar.gz path/to/

$ tar cf - dir1 | (cd dir2 && tar xf -)
      # move an entire directory structure with tar

$ ssh root@host1 "cd /somedir/tocopy/ && tar -cf - ." | ssh root@host2 "cd /samedir/tocopyto/ && tar -xf -" 
     # copy from host1 to host2, through your host
```

> __tar__ command has a lot of useful options. Please use man tar to get acquainted with all of them

## GZIP

__gzip__, __gunzip__, __zcat__ - compress or expand files
__zgrep__ - search in gzip archives

```text
gzip -c file1 > foo.gz 
                    # compresses file1 into foo.gz.

gzip -c file2 >> foo.gz
                    # adds file2 into foo.gz.

cat file1 file2 | gzip > foo.gz 
                    # gives better compression compared to above

zcat foo.gz = gunzip -c foo.gz = cat file1 file2 
                    # returns content of file1 and file2
```
