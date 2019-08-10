# Yollow

## Summary
---
Yollow is and will be the leading real estate and rental marketplace. 
This website will help users to find perfect home to rent or buy in U.S. Select your pefect house by choosing location, price, beds, and baths. Our friendly and knowledgeable website will help you find your perfect house!

## Key Features
### User and Session Authentication
* Users can sign up or log in to use the application
* Users can also log in through a demo account

User credentials are securely hashed, salted, and stored as a password digest

```Ruby
class User < ApplicationRecord
  
  attr_reader :password

  validates :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true 

  after_initialize :ensure_session_token

  has_many :properties,
    foreign_key: :owner_id,
    class_name: :Property

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

   def reset_session_token!
    generate_unique_session_token
    save!
    self.session_token
  end

  private

  def ensure_session_token
    generate_unique_session_token unless self.session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end
```

## Interactive Google map with marker
* Users are able to find listing on goole map
* Listings are displayed on main page
As a user moves the map around, the new bounds (coordinates) will get updated in realtime and send the correct listings from the backend (PostgreSQL database)

```Ruby
class Property < ApplicationRecord
  
  validates :price, :address, :longitude, :latitude, :beds, :baths, :owner_id, presence: true
  validates_uniqueness_of :latitude, :scope => [:longitude]
  validates :sale, inclusion: { in: [ true, false ] }
  validates :rent, inclusion: { in: [ true, false ] }

  has_many_attached :photos

  def self.in_bounds(bounds)
    self.where("latitude < ?", bounds[:northEast][:lat])
      .where("latitude > ?", bounds[:southWest][:lat])
      .where("longitude > ?", bounds[:southWest][:lng])
      .where("longitude < ?", bounds[:northEast][:lng])
  end
```

* Index and Show pages for properties.
* Save properties
* Filter propeties by amenities, location or price
* Validates real address
* Prevents duplicate property creation



## Core
---
The main page consists of header with four main links and user login/signup. The links redirects to the index page where lists properties for rent or buy. The show page 
