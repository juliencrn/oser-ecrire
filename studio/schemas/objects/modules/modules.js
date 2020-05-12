export default {
  name: 'modules',
  type: 'array',
  title: 'Modules',
  description: `Construire la page module par module, l'ordre compte.`,
  of: [
    { type: 'simplePortableTextModule' },
    { type: 'projectsModule' },
    { type: 'servicesModule' },
    { type: 'customersModule' },
    { type: 'formationsModule' },
    { type: 'ctaModule' },
  ],
}
