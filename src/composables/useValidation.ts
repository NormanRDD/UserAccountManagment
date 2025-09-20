import type { UserAccount, AccountErrors, TagItem } from '@/types'

export function useValidation() {
  /**
   * Валидация учетной записи
   */
  const validateAccount = (account: UserAccount): boolean => {
    const errors: AccountErrors = {}

    // Валидация меток (обязательное поле, максимум 50 символов)
    if (!account.tags.trim()) {
      errors.tags = 'Поле "Метки" обязательно для заполнения'
    } else if (account.tags.length > 50) {
      errors.tags = 'Максимум 50 символов'
    } else {
      // Проверка на корректность разделителя
      const tags = account.tags.split(';').map(tag => tag.trim()).filter(tag => tag)
      if (tags.length === 0) {
        errors.tags = 'Введите хотя бы одну метку'
      }
    }

    // Валидация логина (обязательное поле, максимум 100 символов)
    if (!account.login.trim()) {
      errors.login = 'Поле "Логин" обязательно для заполнения'
    } else if (account.login.length > 100) {
      errors.login = 'Максимум 100 символов'
    }

    // Валидация пароля для локальных записей
    if (account.type === 'Локальная') {
      if (!account.password.trim()) {
        errors.password = 'Поле "Пароль" обязательно для заполнения'
      } else if (account.password.length > 100) {
        errors.password = 'Максимум 100 символов'
      }
    }

    account.errors = errors
    return Object.keys(errors).length === 0
  }

  /**
   * Проверка наличия ошибок в аккаунте
   */
  const hasErrors = (account: UserAccount): boolean => {
    return Object.keys(account.errors || {}).length > 0
  }

  /**
   * Парсинг меток в массив объектов
   */
  const parseTags = (tags: string): TagItem[] => {
    return tags
      .split(';')
      .map(tag => tag.trim())
      .filter(tag => tag)
      .map(tag => ({ text: tag }))
  }

  /**
   * Преобразование массива меток в строку
   */
  const stringifyTags = (tags: TagItem[]): string => {
    return tags.map(tag => tag.text).join('; ')
  }

  return {
    validateAccount,
    hasErrors,
    parseTags,
    stringifyTags
  }
}