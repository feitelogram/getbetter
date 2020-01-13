class SavedsController < ApplicationController

def index
    render json: Saved.all 
end

def create
saved= Saved.create(saved_params)
if saved.valid?
    render json: saved, include: [:provider] 
    
else
    render json: {error: "invalid params"}
end
end

def destroy
    saved = Saved.find(params[:id])
    saved.destroy
    render json: {message: "successfully deleted"}
end

private

def saved_params
    params.permit(:user_id, :provider_id)
end

end
