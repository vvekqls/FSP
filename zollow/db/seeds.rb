# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'

Property.delete_all
User.delete_all

guest = User.create!(
  email: 'guest@gmail.com',
  username: 'guest',
  password: 'password'
)

alex = User.create!(
  email: 'paul8@gmail.co.kr',
  username: 'paul8',
  password: 'password'
)

other_user = User.create!(
  email: 'alex09@naver.com',
  username: 'alex09',
  password: 'password'
)

user = User.create!(
  email: 'Johnny99@yahoo.com',
  username: 'Jonyyisgone',
  password: 'password'
)

house = Property.create!(
  price: 1800000,
  address: '2055 42nd Ave, San Francisco, CA 94116',
  latitude: 37.748378,
  longitude: -122.500695,
  sale: true,
  rent: false,
  beds: 3,
  baths: 1,
  owner_id: guest.id
)

house_1 = Property.create!(
  price: 2800,
  address: '46 Chicago Way, San Francisco, CA 94112',
  latitude: 37.710710,
  longitude: -122.429048,
  sale: false,
  rent: true,
  beds: 2,
  baths: 1,
  owner_id: alex.id
)

house_2 = Property.create!(
  price: 3600,
  address: '1620 Broadway APT 1, San Francisco, CA 94109',
  latitude: 37.795982,
  longitude: -122.424179,
  sale: true,
  rent: true,
  beds: 3,
  baths: 1,
  owner_id: other_user.id
)

house.photos.attach(io: open("https://app-yollow-pro.s3-us-west-1.amazonaws.com/IS6umjft8i89lc0000000000.webp"), filename: 'IS6umjft8i89lc0000000000.webp')
house_1.photos.attach(io: open('https://app-yollow-pro.s3-us-west-1.amazonaws.com/ISeo3bar43121b0000000000.webp'), filename: 'ISeo3bar43121b0000000000.webp')
house_2.photos.attach(io: open("https://app-yollow-pro.s3-us-west-1.amazonaws.com/ISu0483lem90740000000000.webp"), filename: 'ISu0483lem90740000000000.webp')