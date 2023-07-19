class User < ApplicationRecord
  before_create :validate_email
  EMAIL_REGEX = Regexp.new "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$"

  private

  def validate_email
    if email.blank?
      errors.add(:email, "can't be blank")
      throw(:abort)
    end
    unless email =~EMAIL_REGEX
      errors.add(:email, "is not a valid email")
      throw(:abort)
    end
  end
end
