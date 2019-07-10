json.photoUrls property.photos.map { |file| url_for(file) }

json.extract! property, :id, :price, :address, :longitude, :latitude, :beds, :baths, :sale, :rent, :owner_id

