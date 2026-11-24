---
curso: "administracion-linux"
modulo: "administracion-linux/fundamentos"
leccion: "niveles-de-ejecucion"
titulo: "Niveles de ejecución"
orden: 9
minutos: 1.2
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 1
ejercicios: []
---

"Runlevel" define the state of the machine after boot.

In a standard practice, when a computer enter runlevel zero, it halts, and when it enters runlevel six, it reboots. Default runlevels are tipically 3, 4 or 5. Lower runlevels are useful for maintenance or emergency repairs, since they usually don't offer any network services at all.

- /etc/rc\[0-6].d/
- K20nfs -> ../init.d/nfs
- S10network -> ../init.d/network
- /etc/inittab id:3:initdefault:

<img src="/apuntes/administracion-linux/runlevels.webp" alt="Runlevels" width="1204" height="550" decoding="async">

## Systemd runlevels

In systemd runlevels are referred to as targets.

- Run level 0 is matched by poweroff.target (and runlevel0.target is a symbolic link to poweroff.target)
- Run level 1 is matched by rescue.target (and runlevel1.target is a symbolic link to rescue.target)
- Run level 3 is emulated by multi-user.target (and runlevel3.target is a symbolic link to multi-user.target)
- Run level 5 is emulated by graphical.target (and runlevel5.target is a symbolic link to graphical.target)
- Run level 6 is emulated by reboot.target (and runlevel6.target is a symbolic link to reboot.target)
- Emergency is matched by emergency.target

View default runlevel:

```shell
systemctl get-default
```

Set default runlevel:

systemctl set-default runlevel0.target
