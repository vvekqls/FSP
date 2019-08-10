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

#### Filter homes by location, price or amenities
* User can filter home by amenities by selecting beds and baths in search bar
* User can filter home by locations in search navigation bar

```Ruby
class Api::PropertiesController < ApplicationController
  def index
    properties = Property.in_bounds(params[:bounds]).with_attached_photos.sample(400)
    min = params[:minPrice].to_i
    max_temp = params[:maxPrice].to_i
    max = (max_temp == 0 ? (+1.0/0.0) : max_temp )
    
    
    @properties = properties.select do |property|
      property.price >= min &&
      property.price <= max &&
      property.beds >= params[:minBeds].to_i &&
      property.baths >= params[:minBaths].to_i &&
      ( property.sale.to_s == params[:buy] ||
        property.rent.to_s == params[:rent] )
    end
    render :index  
  end

  def show
    @property = Property.find(params[:id].to_i)
  end
```

#### Save Properties
* A logged in user is able to view his or her saved properties
* A logged in user is able to save on property and delete any property on saved list.

### Front-end
#### React
The Rails backend API is connected to a React frontend to efficiently render to the virtual DOM.

#### Redux
Redux manages the front-end state of Aerbnb. When database information is retrieved, Redux state is updated first and re-renders the appropriate React components.

### Back-end
#### Ruby on Rails
Ruby on Rails is the back-end framework used to query the database.

#### Database
Aerbnb uses a PostgreSQL database to store its relational data.

#### Future Plans
* Prevention of duplicate home creation
* Validation of real addresses
* Delete User's Property
