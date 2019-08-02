class Api::SavesController < ApplicationController
  def create
    newSave = Save.new(property_id: params[:property_id])
    newSave.user_id = current_user.id

    if newSave.save
      @saves = saved_properties
      render '/api/users/_user'
    else
      render json: newSave.errors.full_messages, status: 422
    end
  end

  def destroy
    @save = Save.find_by(user_id: current_user.id, property_id: params[:id])
    @user = current_user

    if @save.try(:destroy)
      @saves = saved_properties
      render '/api/users/_user'
    else
      render json: { message: 'No destroy' }
    end
  end
end