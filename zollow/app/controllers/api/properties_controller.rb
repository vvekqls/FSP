
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

  def create
    @property = Property.new(property_params);
    @property.owner_id = current_user.id

    if @property.save
      attach_generic_house(@property);
      Save.create(property_id: @property.id, user_id: current_user.id)
      render :show
    else
      render json: @property.errors.full_messages, status: 422
    end
  end

    def attach_generic_house(property)
    property.photos.purge
    if property_photos.empty?
      file = EzDownload.open("https://app-yollow-pro.s3-us-west-1.amazonaws.com/11_print.png")
      property.photos.attach(io: file, filename: '11_print.png')
    else
      property_photos[:photos].each do |photo|
        property.photos.attach(photo)
      end
    end
  end

  def update
    @property = Property.find(params[:id])
    if @property.update(property_params)
      attach_generic_house(@property);
      render :show
    else
      render json: @property.errors.full_messages, status: 422
    end
  end

  def destroy
    property = current_user.properties.find(params[:id])

    if property
      property.delete
      # property.update_attributes({ sale: false, rent: false })
      render json: {message: 'This property has been taken off'}
    else
      render json: property.errors.full_messages, status: 422
    end
  end

  def savedproperties
    ids = params[:property_ids]
    if ids
      ids = ids.map(&:to_i)
    end
    @properties = Property.where(id: ids)
    render :index
  end

  def property_params
    # debugger
    params.require(:property).permit(:address, :latitude, :longitude, :beds, :baths, :price, :sale, :rent)
  end

  def property_photos
    params.require(:property).permit(photos: [])
  end
end
