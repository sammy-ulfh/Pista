---
curso: "python-automatizacion"
modulo: "python-automatizacion/pruebas-y-docker"
leccion: "cobertura-de-pruebas"
titulo: "Cobertura de pruebas"
orden: 40
minutos: 0.6
idioma: "en"
riesgo: "ninguno"
fuente: "notes-tecnologia"
imagenes: 1
ejercicios: []
---

## Install Nose and Coverage

```shell
$ pip install nose
$ pip install coverage
```

## Run tests

```shell
$ nosetests
```

## Run tests and coverage calculation

```shell
$ nosetests --with-coverage --cover-package=handlers/ --cover-erase
```

## Check coverage

```shell
$ nosetests --with-coverage --cover-package=handlers/ --cover-erase --cover-min-percentage=90
```

## Generate coverage report (cover/index.html)

```shell
$ nosetests --with-coverage --cover-package=handlers/ --cover-erase --cover-html
```

## Testing process

<img src="/apuntes/python-automatizacion/testing.gif" alt="Testing" width="480" height="270" decoding="async">
