<template>
    <div class="welcome-container">
      <div class="welcome-card">
        <h1 class="welcome-title">Bienvenido al Cuestionario de Detección de Autismo</h1>
        <p class="welcome-text">
          Este cuestionario tiene como objetivo ayudar en la detección temprana del autismo. Tu participación es importante para mejorar la comprensión y el diagnóstico del trastorno.
        </p>
        <router-link class="start-button" to="/select-group">Comenzar</router-link>
      </div>
      <div class="background-overlay"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WelcomeComponent',
  };
  </script>
  
  <style scoped>
  .welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
  }
  
  .background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/fondo.png') center/cover no-repeat;
    filter: brightness(0.4); /* Fondo oscurecido */
    z-index: -1;
  }
  
  .welcome-card {
    background-color: rgba(228, 228, 228, 0.8); /* Ajusta la opacidad */
    padding: 30px; /* Mayor espacio interno */
    border-radius: 20px; /* Hacerlo más cuadrado */
    text-align: center;
    width: 80%; /* Ajusta el ancho del card */
    max-width: 500px; /* Ancho máximo */
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3); /* Sombra suave */
  }
  
  .welcome-title {
    font-size: 1.8rem;
    color: #3f3f3f;
    margin-bottom: 10px;
  }
  
  .welcome-text {
    font-size: 1rem;
    color: #3f3f3f;
    margin-bottom: 20px;
  }
  
  .start-button {
    background-color: #42b983;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .start-button:hover {
    background-color: #2b7a5c;
  }
  </style>
  