import ConditionalInput from '../../../src/components/conditionalInput'

export default {
  name: 'pageBuilder',
  type: 'object',
  title: 'Constructeur de page',
  inputComponent: ConditionalInput,
  templates: ['', 'home'], // Matches template value
  fields: [
    {
      name: 'modules',
      type: 'modules',
    },
  ],
}
