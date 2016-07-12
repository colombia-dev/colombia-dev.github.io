# Sitio principal

[colombia-dev.org](http://colombia-dev.org)

## Cómo agregar comunidades

Para agregar un nuevo meetup a la página del [listado de meetups](meetups.html) 
solo la debes agregar en la respectiva ciudad. Hay dos aspectos a tener en 
cuenta:

1. Esta página consume un servicio para obtener el total de miembros por meetup, 
por lo que es necesario que al agregar un nuevo meetup sigas el siguiente 
formato:

```html
<li><a href="http://www.meetup.com/BogotaJS/" target="_blank">BogotaJS</a></li>
```

Si la url es de meetup y deseas que se cargue el total de los miembros, es 
importante que la agregues terminando en `meetup.com/ID_COMUNIDAD`, es decir 
no dejes urls con formato terminando en: `meetup.com/es-ES/ID_COMUNIDAD` u otro 
que no sigua esta estructura, puedes dejar un slash al final, pero nada más 
después del slash.

2. Si el meetup cuenta con página aparte y meetup, puedes usar este formato:

```html
<li><a href="http://medellinjs.org" data-meetup-id="MedellinJS" target="_blank">MedellínJS</a></li>
```

En este caso el script usará el atributo en `data-meetup-id` para solicitar su 
información, mientras que en la lista los usuarios ingresarían es a la 
página del meetup.