<template>
  <div class="app">
    <div class="container">
      <!-- Header -->
      <header class="header">
        <h1>🔐 Управление учетными записями</h1>
        <p>Система для создания и управления пользовательскими аккаунтами с валидацией в реальном времени</p>
      </header>

      <!-- Tech Stack -->
      <div class="tech-stack">
        <h3>🛠 Технологический стек:</h3>
        <div class="tech-list">
          <span class="tech-item">Vue.js 3 + Composition API</span>
          <span class="tech-item">TypeScript</span>
          <span class="tech-item">Pinia (управление состоянием)</span>
          <span class="tech-item">Vite</span>
          <span class="tech-item">Современный CSS</span>
        </div>
      </div>

      <!-- Main Form -->
      <div class="form-section">
        <div class="section-title">
          <h2>📝 Учетные записи</h2>
          <button class="add-button" @click="store.addAccount()">
            ➕ Добавить запись
          </button>
        </div>

        <!-- Info Card -->
        <div class="info-card">
          <p>💡 Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
        </div>

        <!-- Accounts List -->
        <TransitionGroup name="fade" tag="div">
          <AccountItem
            v-for="(account, index) in store.accounts"
            :key="account.id"
            :account="account"
            @remove="store.removeAccount(index)"
          />
        </TransitionGroup>

        <!-- Empty State -->
        <div v-if="!store.hasAccounts" class="empty-state">
          <p>Нет учетных записей. Нажмите "Добавить запись" для создания новой.</p>
        </div>

        <!-- Save Info -->
        <div class="save-info">
          💾 Все поля сохраняются в текстовом виде, кроме поля "Метка". 
          Метки преобразуются в массив объектов вида <code>{ text: "метка" }</code>, где каждый элемент разделен точкой с запятой.
          <br><br>
          ✅ Сохранение учетной записи происходит автоматически при обновлении данных.
          <br>
          📊 Всего записей: {{ store.accountsCount }}
        </div>

        <!-- Actions -->
        <div class="actions">
          <button 
            v-if="store.hasAccounts"
            class="clear-button" 
            @click="clearAllAccounts"
          >
            🗑️ Очистить все записи
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAccountStore } from '@/stores/accountStore'
import AccountItem from '@/components/AccountItem.vue'

// Store
const store = useAccountStore()

// Methods
const clearAllAccounts = (): void => {
  if (confirm('Вы уверены, что хотите удалить все учетные записи?')) {
    store.clearAllAccounts()
  }
}

// Lifecycle
onMounted(() => {
  store.loadFromStorage()
  
  // Если нет записей, добавляем одну по умолчанию
  if (!store.hasAccounts) {
    store.addAccount()
  }
})
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px;
}

@media (min-width: 480px) {
  .container {
    padding: 16px;
  }
}

@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 24px;
  }
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

@media (min-width: 768px) {
  .header {
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 30px;
    text-align: left;
  }
}

.header h1 {
  font-size: 1.8rem;
  margin-bottom: 8px;
  line-height: 1.2;
}

@media (min-width: 480px) {
  .header h1 {
    font-size: 2rem;
  }
}

@media (min-width: 768px) {
  .header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
}

.header p {
  font-size: 0.95rem;
  opacity: 0.9;
  line-height: 1.4;
}

@media (min-width: 768px) {
  .header p {
    font-size: 1.1rem;
  }
}

.tech-stack {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  .tech-stack {
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
}

.tech-stack h3 {
  color: #495057;
  margin-bottom: 12px;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .tech-stack h3 {
    margin-bottom: 15px;
    font-size: 1.1rem;
  }
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

@media (min-width: 768px) {
  .tech-list {
    gap: 10px;
    justify-content: flex-start;
  }
}

.tech-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
}

@media (min-width: 768px) {
  .tech-item {
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
  }
}

.form-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .form-section {
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 30px;
  }
}

.section-title {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #eee;
}

@media (min-width: 640px) {
  .section-title {
    flex-direction: row;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
    padding-bottom: 15px;
  }
}

.section-title h2 {
  font-size: 1.3rem;
  color: #333;
  text-align: center;
}

@media (min-width: 640px) {
  .section-title h2 {
    font-size: 1.5rem;
    text-align: left;
  }
}

.add-button {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  min-height: 44px;
}

@media (min-width: 640px) {
  .add-button {
    width: auto;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1rem;
    gap: 8px;
  }
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 172, 254, 0.3);
}

.add-button:active {
  transform: translateY(0);
}

.info-card {
  background: #e3f2fd;
  border-left: 4px solid #2196F3;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .info-card {
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 6px;
  }
}

.info-card p {
  color: #1565C0;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1.4;
  text-align: center;
}

@media (min-width: 768px) {
  .info-card p {
    font-size: 1rem;
    text-align: left;
  }
}

.empty-state {
  text-align: center;
  padding: 30px 20px;
  color: #666;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .empty-state {
    padding: 40px;
    font-size: 1.1rem;
  }
}

.save-info {
  background: #e8f5e8;
  border: 1px solid #4caf50;
  color: #2e7d32;
  padding: 12px;
  border-radius: 6px;
  margin-top: 16px;
  text-align: center;
  font-weight: 500;
  font-size: 0.85rem;
  line-height: 1.4;
}

@media (min-width: 768px) {
  .save-info {
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
    font-size: 0.9rem;
  }
}

.save-info code {
  background: rgba(46, 125, 50, 0.1);
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
}

.actions {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

@media (min-width: 768px) {
  .actions {
    margin-top: 20px;
  }
}

.clear-button {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  min-height: 44px;
}

@media (min-width: 768px) {
  .clear-button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

.clear-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.clear-button:active {
  transform: translateY(0);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (min-width: 768px) {
  .fade-enter-from, .fade-leave-to {
    transform: translateX(-30px);
  }
}

/* Touch improvements for mobile */
@media (max-width: 767px) {
  button, input, select {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
  
  /* Prevent zoom on input focus */
  input[type="text"],
  input[type="password"],
  select {
    font-size: 16px;
  }
}
</style>