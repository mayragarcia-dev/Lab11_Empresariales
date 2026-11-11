# Cine Aurora — Laboratorio 11

Comunicación entre componentes en ReactJS. Continuación de la cartelera existente, con los puntos 7–11 implementados.

## Ejecutar

Requiere Node.js compatible con Vite 8 (20.19+ o 22.12+) y npm.

```sh
npm ci
npm run dev
```

## Verificar

```sh
npm test
npm run lint
npm run build
```

En **Próximamente**, usar **Recargar estrenos**, **Simular error** y **Reintentar** para reproducir los tres estados. La demora es de 1200 ms; los datos son ficticios y locales. Las imágenes y fuentes sí requieren conexión.

Marcar favoritas actualiza el total de la cabecera. Escribir en el buscador filtra tras 300 ms; **Limpiar filtro** en el banner restablece inmediatamente el buscador y las ocho películas, conservando las favoritas.

El carrusel utiliza `embla-carousel-react`, con botones anterior/siguiente y arrastre. `useWindowSize` se comparte entre cartelera y sección de estrenos.

## Entregable

Consultar [docs/ENTREGABLE_LAB11.md](docs/ENTREGABLE_LAB11.md): diagnóstico, desarrollo, árbol de componentes, propiedad de los datos, código relevante, pruebas, capturas y conclusiones. Completar los datos del alumno y la distribución real del trabajo antes de entregarlo.

Rama de trabajo: `lab11/puntos-7-11`.
