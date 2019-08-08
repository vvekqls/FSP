json.extract! current_user, :id, :email, :username

saves = saved_properties
if logged_in? && saves
  json.savedProperties saves.map{ |save| save.property_id }
else
  json.savedProperties []
end
