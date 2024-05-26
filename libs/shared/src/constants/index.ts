export enum SERVICE_NAMES {
  AUTH = 'AUTH_SERVICE',
  PRICING = 'PRICING_SERVICE',
  PAYMENT = 'PAYMENT_SERVICE',
  MAILER = 'MAILER_SERVICE',
}

export enum SERVICE_PATTERNS {
  AUTH = 'authenticate_user',
  PRICING = 'check_availability',
  INVENTORY = 'update_inventory',
  PAYMENT = 'create_payment',
  MAIL = 'send_email',
}

export enum RESERVATION_STATUS {
  PENDING = 'payment pending',
  RESERVE = 'reserved',
  CANCEL = 'cancelled',
}

export enum MAIL_TYPE {
  CONFIRMATION = 'confirmation.hbs',
  RESET = 'reset.hbs',
  VERIFY = 'verify.hbs',
  CANCEL = 'cancellation.hbs',
}
