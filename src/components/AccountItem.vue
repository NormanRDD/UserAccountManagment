<template>
  <div 
    class="account-item"
    :class="{ 'has-error': hasErrors(account) }"
  >
    <div class="form-row">
      <div class="form-fields">
        <!-- Метки -->
        <div class="form-group">
          <label>Метки</label>
          <input 
            v-model="account.tags"
            type="text" 
            class="form-input"
            :class="{ error: account.errors?.tags }"
            placeholder="метка1; метка2"
            maxlength="50"
            @input="handleInput"
          />
          <div v-if="account.errors?.tags" class="error-message">
            {{ account.errors.tags }}
          </div>
        </div>

        <!-- Тип записи -->
        <div class="form-group">
          <label>Тип записи</label>
          <select 
            :value="account.type"
            class="form-select"
            @change="handleTypeChange"
          >
            <option value="Локальная">Локальная</option>
            <option value="LDAP">LDAP</option>
          </select>
        </div>

        <!-- Логин -->
        <div class="form-group">
          <label>Логин</label>
          <input 
            v-model="account.login"
            type="text" 
            class="form-input"
            :class="{ error: account.errors?.login }"
            placeholder="Логин пользователя"
            maxlength="100"
            @input="handleInput"
          />
          <div v-if="account.errors?.login" class="error-message">
            {{ account.errors.login }}
          </div>
        </div>

        <!-- Пароль -->
        <div class="form-group">
          <label>Пароль</label>
          <div 
            v-if="account.type === 'Локальная'"
            class="password-input-container"
          >
            <input 
              v-model="account.password"
              :type="account.showPassword ? 'text' : 'password'"
              class="form-input"
              :class="{ error: account.errors?.password }"
              placeholder="Введите пароль"
              maxlength="100"
              @input="handleInput"
            />
            <button 
              type="button"
              class="password-toggle"
              @click="togglePassword"
              :title="account.showPassword ? 'Скрыть пароль' : 'Показать пароль'"
            >
              {{ account.showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <input 
            v-else
            v-model="account.password"
            type="text" 
            class="form-input"
            placeholder="Значение"
            maxlength="100"
            @input="handleInput"
            readonly
          />
          <div v-if="account.errors?.password" class="error-message">
            {{ account.errors.password }}
          </div>
        </div>
      </div>

      <!-- Кнопка удаления -->
      <button 
        class="delete-button" 
        @click="$emit('remove')"
        title="Удалить учетную запись"
        type="button"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { UserAccount, AccountType } from '@/types'
import { useValidation } from '@/composables/useValidation'
import { useAccountStore } from '@/stores/accountStore'

// Props
const props = defineProps<{
  account: UserAccount
}>()

// Emits
const emit = defineEmits<{
  remove: []
}>()

// Composables
const { validateAccount, hasErrors } = useValidation()
const store = useAccountStore()

// Methods
const handleInput = (): void => {
  validateAccount(props.account)
  store.saveToStorage()
}

const handleTypeChange = (event: Event): void => {
  const target = event.target as HTMLSelectElement
  const newType = target.value as AccountType
  store.handleTypeChange(props.account, newType)
  handleInput()
}

const togglePassword = (): void => {
  store.togglePasswordVisibility(props.account.id)
}
</script>

<style scoped>
.account-item {
  background: #fafafa;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .account-item {
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
  }
}

.account-item:hover {
  border-color: #667eea;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
}

.account-item.has-error {
  border-color: #f44336;
  background: #ffebee;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  align-items: start;
}

@media (min-width: 640px) {
  .form-row {
    grid-template-columns: 1fr auto;
    align-items: end;
  }
}

@media (min-width: 1024px) {
  .form-row {
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    gap: 15px;
  }
}

.form-fields {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 640px) {
  .form-fields {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (min-width: 1024px) {
  .form-fields {
    display: contents;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 4px;
  color: #555;
  font-size: 0.85rem;
}

@media (min-width: 768px) {
  .form-group label {
    margin-bottom: 5px;
    font-size: 0.9rem;
  }
}

.form-input {
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;
  width: 100%;
  min-height: 44px;
}

@media (min-width: 768px) {
  .form-input {
    padding: 12px;
    font-size: 1rem;
  }
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.error {
  border-color: #f44336;
}

.form-select {
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  min-height: 44px;
}

@media (min-width: 768px) {
  .form-select {
    padding: 12px;
    font-size: 1rem;
  }
}

.form-select:focus {
  outline: none;
  border-color: #667eea;
}

.password-input-container {
  position: relative;
  width: 100%;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 1.1rem;
  transition: color 0.2s ease;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) {
  .password-toggle {
    right: 12px;
  }
}

.password-toggle:hover {
  color: #667eea;
}

.delete-button {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: fit-content;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
}

@media (min-width: 640px) {
  .delete-button {
    align-self: end;
    margin-top: 0;
  }
}

@media (min-width: 1024px) {
  .delete-button {
    padding: 12px;
    margin-top: 25px;
    align-self: start;
  }
}

.delete-button:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.delete-button:active {
  transform: scale(0.98);
}

.error-message {
  color: #f44336;
  font-size: 0.8rem;
  margin-top: 4px;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .error-message {
    font-size: 0.85rem;
    margin-top: 5px;
  }
}

/* Mobile-first responsive adjustments */
@media (max-width: 639px) {
  .form-row {
    gap: 16px;
  }
  
  .delete-button {
    width: 100%;
    margin-top: 8px;
    padding: 12px;
  }
}

/* Touch improvements */
@media (hover: none) {
  .account-item:hover {
    border-color: #e0e0e0;
    box-shadow: none;
  }
  
  .password-toggle:hover {
    color: #666;
  }
  
  .delete-button:hover {
    transform: none;
    box-shadow: none;
  }
}
</style>