<template>
    <div class="group-selection-container">
      <div class="background-overlay"></div>
      <div class="group-selection-content">
        <h2 class="group-selection-title">Por favor, escoge una opción:</h2>
        <div class="group-list-container">
          <ul class="group-list">
            <li v-for="group in groups" :key="group.id" class="group-list-item">
              <div class="group-card">
                <h3 class="group-name">{{ group.name }}</h3>
                <p class="group-description">{{ group.description }}</p>
                <div class="group-link-container">
                  <router-link :to="'/questionnaire/' + group.id" class="group-link">Comenzar</router-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GroupSelectionComponent',
    data() {
      return {
        groups: [
          { id: 1, name: 'Niños de 3 a 5 años', description: 'Preguntas adaptadas para niños en edad preescolar.' },
          { id: 2, name: 'Niños de 6 a 12 años', description: 'Cuestionario diseñado para niños en edad escolar.' },
          { id: 3, name: 'Adultos (20 años en adelante)', description: 'Preguntas destinadas a adultos para evaluar el autismo.' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .group-selection-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
    position: relative; /* Agregado para posicionamiento relativo */
  }
  
  .background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/fondo1.webp') center/cover no-repeat;
    filter: brightness(0.5); /* Fondo oscurecido */
    z-index: -1;
  }
  
  .group-selection-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    width: 100%;
    max-width: 800px;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
    text-align: center; /* Centrar el contenido horizontalmente */
  }
  
  .group-selection-title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 20px;
  }
  
  .group-list-container {
    display: flex;
    justify-content: center;
  }
  
  .group-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  
  .group-list-item {
    margin: 15px 0;
    display: flex;
    justify-content: center;
  }
  
  .group-card {
    padding: 20px;
    background-color: #fff;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
    width: 100%;
  }
  
  .group-card:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .group-name {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .group-description {
    font-size: 1rem;
    color: #666;
    margin-bottom: 15px;
  }
  
  .group-link-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .group-link {
    display: block;
    text-align: center;
    background-color: #4caf50;
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1.2rem;
    transition: background-color 0.3s;
    cursor: pointer;
    margin: 5px;
  }
  
  .group-link:hover {
    background-color: #45a049;
  }
  </style>
  