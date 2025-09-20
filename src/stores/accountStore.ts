import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserAccount, SavedAccount, AccountType, TagItem } from '@/types'
import { useValidation } from '@/composables/useValidation'

export const useAccountStore = defineStore('accounts', () => {
  // State
  const accounts = ref<UserAccount[]>([])
  const nextId = ref<number>(1)

  // Composables
  const { parseTags, stringifyTags } = useValidation()

  // Getters
  const accountsCount = computed(() => accounts.value.length)
  const hasAccounts = computed(() => accounts.value.length > 0)

  // Actions
  /**
   * Добавление новой учетной записи
   */
  const addAccount = (): void => {
    const newAccount: UserAccount = {
      id: nextId.value++,
      tags: '',
      type: 'Локальная',
      login: '',
      password: '',
      showPassword: false,
      errors: {}
    }
    accounts.value.push(newAccount)
    saveToStorage()
  }

  /**
   * Удаление учетной записи
   */
  const removeAccount = (index: number): void => {
    if (index >= 0 && index < accounts.value.length) {
      accounts.value.splice(index, 1)
      saveToStorage()
    }
  }

  /**
   * Переключение видимости пароля
   */
  const togglePasswordVisibility = (accountId: number): void => {
    const account = accounts.value.find(acc => acc.id === accountId)
    if (account) {
      account.showPassword = !account.showPassword
    }
  }

  /**
   * Обработка изменения типа записи
   */
  const handleTypeChange = (account: UserAccount, newType: AccountType): void => {
    account.type = newType
    if (newType === 'LDAP') {
      account.password = ''
      account.showPassword = false
    }
  }

  /**
   * Сохранение в localStorage
   */
  const saveToStorage = (): void => {
    try {
      const dataToSave: SavedAccount[] = accounts.value.map(account => ({
        id: account.id,
        tags: parseTags(account.tags), // Преобразуем в массив объектов { text: string }
        type: account.type,
        login: account.login,
        password: account.type === 'LDAP' ? null : account.password
      }))
      
      localStorage.setItem('userAccounts', JSON.stringify(dataToSave))
      console.log('Сохранено в localStorage:', dataToSave) // Для отладки
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error)
    }
  }

  /**
   * Загрузка из localStorage
   */
  const loadFromStorage = (): void => {
    try {
      const saved = localStorage.getItem('userAccounts')
      if (saved) {
        const parsedData: SavedAccount[] = JSON.parse(saved)
        
        accounts.value = parsedData.map(account => ({
          ...account,
          tags: Array.isArray(account.tags) 
            ? stringifyTags(account.tags) // Преобразуем объекты { text: string } обратно в строку
            : account.tags || '',
          password: account.password || '',
          showPassword: false,
          errors: {}
        }))
        
        // Обновляем nextId
        if (accounts.value.length > 0) {
          nextId.value = Math.max(...accounts.value.map(a => a.id)) + 1
        }
      }
       
      
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error)
    }
  }

  /**
   * Очистка всех записей
   */
  const clearAllAccounts = (): void => {
    accounts.value = []
    localStorage.removeItem('userAccounts')
  }

  /**
   * Получение аккаунта по ID
   */
  const getAccountById = (id: number): UserAccount | undefined => {
    return accounts.value.find(account => account.id === id)
  }

  return {
    // State
    accounts,
    nextId,
    
    // Getters
    accountsCount,
    hasAccounts,
    
    // Actions
    addAccount,
    removeAccount,
    togglePasswordVisibility,
    handleTypeChange,
    saveToStorage,
    loadFromStorage,
    clearAllAccounts,
    getAccountById
  }
})