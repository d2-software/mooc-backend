const { v4: generateUuid } = require('uuid')

module.exports = [
  {
    uuid: generateUuid(),
    name: 'ROLE_USER',
    is_default: true,
    priority: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    uuid: generateUuid(),
    name: 'ROLE_GESTOR',
    priority: 1,
    is_default: false,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    uuid: generateUuid(),
    name: 'ROLE_ADMIN',
    priority: 2,
    is_default: false,
    created_at: new Date(),
    updated_at: new Date()
  }
]
