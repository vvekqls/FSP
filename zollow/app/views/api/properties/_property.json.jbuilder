photos = property.photos.to_a.map{ |photo| url_for(photo) }

json.extract! property, :id, :price, :address, :longitude, :latitude, :beds, :baths, :sale, :rent, :owner_id
json.photos photos

