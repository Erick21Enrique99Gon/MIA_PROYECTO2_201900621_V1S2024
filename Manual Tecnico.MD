<img src='https://user-images.githubusercontent.com/36779113/128587817-1a6c2fdc-d106-4dd3-b092-104c8299bded.png' background='white'>

### Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Manejo e Implementacion de Archivos
### Vacaciones Junio 2024
---

<center>

|NOMBRE|CARNET|
|---|---|
|Erick Enrique González Chávez|201900621|
</center>

### Objetivos:
- Aprender a administrar archivos y estructuras en NodeJS
- Comprender la funcionalidad de un flujo de mongodb
- Utilizar un framework (Angular, React, Vue)
- Administrar los usuarios y permisos por medio de grupos
- Restringir y administrar el acceso a los archivos de modo administrador, cliente y recepcionista.
- Crear una aplicación visual
- Utilizar los servicios de una nube (para este proyecto utilizaremos AWS)

### Arquitectura

![ Arquitectura ](/imagenes/arquitectura.png)

Se tendra un EC2 que contendra un el frontend, backend y base de datos no relacional. El frontend esta desarrollado con Angular mientras que el backend se tengra un servidor realizado con node.js. Se tengra base de datos no relacional usando mongodb.

## Servicios

### EC2

Se tienen los detalles de la EC2.

![ Arquitectura ](/imagenes/1.png)
![ Arquitectura ](/imagenes/2.png)

Reglas de entrada y salida

![ Arquitectura ](/imagenes/3.png)

### s3

Se tiene los detalles de S3 bucket.

Politica del bucket

![ Arquitectura ](/imagenes/4.png)

Detalles 

![ Arquitectura ](/imagenes/5.png)
![ Arquitectura ](/imagenes/6.png)
![ Arquitectura ](/imagenes/7.png)

## Usuarios IAM

Usuario bucket S3 
![ Arquitectura ](/imagenes/8.png)

Usuario EC2
![ Arquitectura ](/imagenes/9.png)

Conclusiones

- Se aprendio a administrar archivos y estructuras en NodeJS
- Se comprendio la funcionalidad de un flujo de mongodb
- Se aprendio a usar un framework (Angular)
- Se dio una forma de arministrar los usuarios y permisos por medio de grupos de manera que se pueda restringir y administrar el acceso a los archivos de modo administrador, cliente y recepcionista.
- Se creo una aplicación visual
- Se utilizaron los servicios de una nube de AWS