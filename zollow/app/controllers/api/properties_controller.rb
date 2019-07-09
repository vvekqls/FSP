
class Api::PropertiesController < ApplicationController

  def index
    @properties = Property.all
  end

  def create 
    # debugger
    # @property.owner_id = current_user.id
    @property = Property.new(property_params)
    # need to use this code to save the property 

    if @property.save!
      render :show
    else
      render json: @property.errors.full_messages, status: 422
    end
  end

  def show
    @property = Property.find(params[:id])
    render :show
  end

  def update
    @property = Property.find(params[:id])
    if @property.update(property_params)
      render :show
    else
      render json: @property.errors.full_messages, status: 422
    end
  end

  def destroy
    @property = current_user.properties.find(params[:id])
    if @property
      @property.update({ sale: false, rent: false })
      render json: {message: 'This property has been removed'}
    else
      render json: @property.errors.full_messages, status: 422
    end
  end


  
  def property_params
    debugger
    params.require(:property).permit(
      :address, 
      :latitude, 
      :longitude, 
      :beds, 
      :baths, 
      :price, 
      :sale, 
      :rent,
      :owner_id
    ) 
  end
end
