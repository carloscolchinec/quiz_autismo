
<script>
  export default {
    name: 'QuestionnaireComponent',
    data() {
      return {
        groupId: null,
        questionGroups: {
          1: [
            '¿El niño/a imita (hace lo mismo que) lo que haces?',
            '¿El niño/a muestra interés en otros niños?',
            '¿El niño/a señala para mostrar algo interesante?',
            '¿El niño/a sigue las direcciones cuando se le habla?',
            '¿El niño/a responde cuando le llaman por su nombre?',
            '¿El niño/a tiene dificultad en iniciar o mantener una conversación con otros?',
            '¿El niño/a usa frases simples para comunicarse?',
            '¿El niño/a muestra interés en jugar a "fingir", como hacer como si cocinara o hablara por teléfono?',
            '¿El niño/a se muestra incómodo o ansioso en situaciones sociales?',
            '¿El niño/a tiene comportamientos o intereses inusuales o intensos?'
          ],
          2: [
            '¿Encuentras difícil entender los chistes o el humor abstracto que otras personas encuentran graciosos?',
            '¿Prefieres pasar tiempo solo o en actividades solitarias en lugar de estar con otras personas?',
            '¿Te resulta difícil entender las señales no verbales, como gestos o expresiones faciales, en los demás?',
            '¿A menudo tienes dificultades para iniciar o mantener una conversación con otros?',
            '¿Tienes intereses muy intensos en temas específicos y te gusta aprender todo lo que puedas sobre esos temas?',
            '¿Te resulta complicado entender los puntos de vista o las emociones de los demás?',
            '¿Te cuesta entender las reglas no escritas en situaciones sociales, como saber cuándo es tu turno para hablar?',
            '¿Encuentras difícil trabajar en grupo o colaborar en actividades con compañeros?',
            '¿Prefieres seguir tus propias rutinas y rituales en lugar de adaptarte a los cambios?',
            '¿Tienes dificultades para reconocer las señales sociales, como cuando alguien está aburrido o molesto?'
          ],
          3: [
            '¿Encuentras difícil entender las señales sociales sutiles, como saber cuándo es tu turno para hablar en una conversación?',
            '¿Prefieres actividades solitarias en lugar de interactuar socialmente?',
            '¿Te resulta complicado leer el lenguaje corporal y las expresiones faciales de los demás?',
            '¿Tienes dificultades para comprender las normas sociales no escritas y las reglas implícitas?',
            '¿Tienes intereses y pasatiempos intensos y especializados que a menudo son diferentes de los de tus compañeros?',
            '¿Encuentras difícil iniciar y mantener conversaciones informales con personas que no conoces bien?',
            '¿Tienes rutinas y rituales específicos que prefieres seguir en tu vida diaria?',
            '¿Tienes dificultades para reconocer y expresar tus propias emociones, así como para comprender las emociones de los demás?',
            '¿Encuentras difícil entender los chistes y el humor abstracto?',
            '¿Prefieres seguir tus propias reglas y normas en lugar de adaptarte a las convenciones sociales?'
          ]
        },
        questions: [],
      randomOrder: [],
      answers: [],
      showResult: false,
      result: '',
      currentQuestionIndex: 0
      };
    },
    computed: {
    resultPercentage() {
      const maxScore = this.questions.length * 1.5;
      const score = this.answers.reduce((acc, answer) => {
        if (answer === 'SI') return acc + 1.45;
        if (answer === 'TALVEZ') return acc + 0.5;
        return acc;
      }, 0);
      
      return Math.min((score / maxScore) * 100, 100);
    },
    answerOptions() {
      return ['SI', 'NO', 'TALVEZ'];
    },
    currentQuestion() {
      return this.questions[this.randomOrder[this.currentQuestionIndex]];
    }
  },
  created() {
    this.groupId = this.$route.params.groupId;
    this.loadQuestions();
  },
  methods: {
    loadQuestions() {
      this.questions = this.questionGroups[this.groupId];
      this.randomOrder = this.generateRandomOrder(this.questions.length);
    },
    generateRandomOrder(length) {
      const order = [];
      while (order.length < length) {
        const randomIndex = Math.floor(Math.random() * length);
        if (!order.includes(randomIndex)) {
          order.push(randomIndex);
        }
      }
      return order;
    },
    nextQuestion() {
      this.currentQuestionIndex++;
    },
    prevQuestion() {
      this.currentQuestionIndex--;
    },
    goBackToMenu() {
      this.$router.push('/select-group');
    },
    submitQuestionnaire() {
      const score = this.answers.reduce((acc, answer) => {
        if (answer === 'SI') return acc + 1;
        if (answer === 'TALVEZ') return acc + 0.5;
        return acc;
      }, 0);

      if (score <= 3) {
        this.result = 'No presenta el nivel de autismo';
      } else if (score <= 6) {
        this.result = 'Nivel de autismo intermedio';
      } else {
        this.result = 'Nivel de autismo avanzado';
      }

      this.showResult = true;
    }
  }
};
  </script>

<template>
    <div class="main-container">
      <div class="overlay"></div>
      
      <div class="questionnaire-container">
        <button class="back-button" @click="goBackToMenu">Regresar al Menú</button>
  
        <div class="card">
          <h2 class="questionnaire-title">Cuestionario</h2>
          <div v-if="!showResult">
            <transition name="fade" mode="out-in">
              <div :key="currentQuestionIndex" class="question">
                <p class="question-text">{{ currentQuestion }}</p>
                <div class="answer-options">
                  <label class="answer-option" v-for="(option, index) in answerOptions" :key="index">
                    <input type="radio" v-model="answers[currentQuestionIndex]" :value="option" />
                    <span class="radio-label">{{ option }}</span>
                  </label>
                </div>
              </div>
            </transition>
            <div class="question-count-card">
              <div class="question-count">{{ currentQuestionIndex + 1 }} / {{ questions.length }}</div>
            </div>
            <button @click="prevQuestion" v-if="currentQuestionIndex > 0">Anterior</button>
            <button @click="nextQuestion" v-if="currentQuestionIndex < questions.length - 1">Siguiente</button>
            <button @click="submitQuestionnaire" v-else>Obtener Resultado</button>
            <div class="progress-bar">
              <div class="progress white-bg" :style="{ width: resultPercentage + '%' }">
                {{ resultPercentage.toFixed(2) }}%
              </div>
            </div>
          </div>
          <div v-else class="result">
            <h3 class="result-title">Resultado:</h3>
            <p class="result-text">{{ result }}</p>
            <div class="progress-bar">
              <div class="progress white-bg" :style="{ width: resultPercentage + '%' }">
                {{ resultPercentage.toFixed(2) }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <style scoped>

.back-button {
  position: absolute;
  top: 90px;
  left: -30px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #388e3c;
}

.main-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('../assets/fondo2.webp') center/cover no-repeat; /* Cambia a tu imagen de fondo */
  font-family: 'Arial', sans-serif;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
.questionnaire-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.questionnaire-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  position: relative;
  z-index: 1;
}
  .questionnaire-title {
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
  }
  
  .question {
    margin-bottom: 20px;
  }
  
  .question-text {
    font-size: 1.5rem;
    color: #555;
    padding: 10px; /* Añadido padding */
    text-align: center; /* Centrar texto */
    max-width: 600px; /* Ancho máximo para salto de línea */
    margin: 0 auto; /* Centrar el bloque */
  }
  
  .answer-options {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 15px;
  }
  
  .answer-option {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .radio-label {
    display: inline-block;
    padding: 5px 12px;
    border: 2px solid #4caf50;
    border-radius: 5px;
    margin-left: 15px;
    color: #4caf50;
    font-weight: bold;
    cursor: pointer;
    background-color: #f0f8ea;
    transition: background-color 0.3s;
  }
  
  .answer-option input[type="radio"]:checked + .radio-label {
    background-color: #4caf50;
    color: white;
  }
  
  .result {
    margin-top: 30px;
    text-align: center;
  }
  
  .result-title {
    font-size: 1.8rem;
    color: #4caf50;
    margin-bottom: 15px;
  }
  
  .result-text {
    font-size: 1.2rem;
    color: #333;
  }

  .progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  height: 30px;
  border-radius: 5px;
  margin-top: 20px;
}

.progress.white-bg {
  background-color: #4caf50;
  color: #000;
  width: 0;
  transition: width 0.3s ease-in-out;
  text-align: center;
  border-radius: 5px;
}
  
  .question-count-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    margin-top: 15px;
    display: inline-block;
  }
  
  .question-count {
    font-size: 1.2rem;
    color: #666;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 12px 25px;
    border: none;
    margin-left: 30px;
    border-radius: 5px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  