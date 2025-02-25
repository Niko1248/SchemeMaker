export default function validateDeviceData(data) {
  const deviceType = ["QF", "QD", "QFD", null, undefined]
  const validPhases = new Set(["1", "2", "3"])

  for (let index = 1; index < data.length; index++) {
    const element = data[index]

    // Проверка столбца "Группа"
    // Проверяю на цифры и слово "Ввод"
    if (element.Группа && element.Группа !== "Ввод" && isNaN(Number(element.Группа))) {
      throw new Error(`В колонке "Группа" строка №${element.Строка} введено не число или слово "Ввод"`)
    } else {
      // Изменяю "Ввод" на -1
      let group = String(element.Группа).trim()
      element.Группа = group.toLowerCase() === "ввод" ? -1 : group
    }

    // Проверка столбца "Тип"
    // Проверяю что введено известное устройство
    if (!deviceType.includes(element.Тип)) {
      throw new Error(`В колонке "Тип" строка №${element.Строка} введено неизвестное устройство`)
    }

    // Проверка столбца "Фаза"
    // Убираю в колонке "Фаза" все ненужные значения
    if (element.Фаза) {
      element.Фаза = Array.from(
        new Set([...String(element.Фаза)].filter((item) => validPhases.has(item.toUpperCase())))
      )
    }
    // Проверяю фазу на undefined и пустой массив, после того как его отфильтровал на валидные значения
    if (!element.Фаза || element.Фаза.length === 0) {
      throw new Error(`В колонке "Фаза" строка №${element.Строка} значение не введено, либо значение неверное`)
    }
  }

  return data
}
