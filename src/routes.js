import { createRouter, createWebHistory } from 'vue-router';
import WelcomeComponent from '@/components/Welcome.vue';
import GroupSelectionComponent from '@/components/GroupSelection.vue';
import QuestionnaireComponent from '@/components/Questionnaire.vue';


const routes = [
  { path: '/', component: WelcomeComponent },
  { path: '/select-group', component: GroupSelectionComponent },
  { path: '/questionnaire/:groupId', component: QuestionnaireComponent },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
