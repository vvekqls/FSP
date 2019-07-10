
class Api::PropertiesController < ApplicationController
  def index
    properties = bounds ? Property.in_bounds(bounds) : Property.all

    if params[:minPrice] && params[:maxPrice]
      properties = properties.where(pricing: seating_range)
    end

    @properties = properties
    render :index  
  end

  def show
    @property = Property.find(params[:id])
  end

  def create
    @property = Property.new(property_params);
    @property.owner_id = current_user.id

    if @property.save
      render :show
    else
      render json: @property.errors.full_messages, status: 422
    end
  end

  def update
    @property = Property.find(params[:id])
    if @property.update(property_params)
      render :show
    else
      render json: @property.errors.full_messages, status: 422
    end
  end

  def destory
    property = current_user.properties.find(params[:id])

    if property
      property.update({ sale: false, rent: false })
      render json: {message: 'This property has been taken off'}
    else
      render json: property.errors.full_messages, status: 422
    end
  end

  def property_params
    debugger
    params.require(:property).permit(:address, :latitude, :longitude, :beds, :baths, :price, :sale, :rent)
  end

  def pricing_range
    (params[:minPrice]..params[:maxPrice])
  end

  def bounds
    params[:bounds]
  end

  def home_photos
    params.require(:property).permit(photos: [])
  end
end
