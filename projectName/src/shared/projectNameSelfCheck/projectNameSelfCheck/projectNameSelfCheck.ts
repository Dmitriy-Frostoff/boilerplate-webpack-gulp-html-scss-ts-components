/**
 * Log to the browser's console the message of the job selfcheck
 *
 *  @return {void} - log the result
 *
 */

export default function logSelfCheck(): void {
  const messageSelfCheck: string = `
  **ТЗ** 
https://github.com/rolling-scopes-school/tasks/blob/master/tasks

        **Форма для проверки** 
https://rolling-scopes-school.github.io/checklist/


**Ваша оценка - {number} балла** 

#### Отзыв по пунктам ТЗ:

#####**Не выполненные/не засчитанные пункты:**
======================================================
1) Something usefull 

#####**Выполненные пункты:**
=====================================================

1) Something pretty sweet and usefull
`;

  console.log(messageSelfCheck);
}
