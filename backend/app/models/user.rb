class User < ApplicationRecord
has_secure_password
has_many :saveds
has_many :providers, through: :saveds
validates :username, uniqueness: true
end
