class SavedsController < ApplicationController

def create
saved= Saved.create(saved_params)
if saved.valid?
    render json: saved, include: [] 
    
else
    
end
end

private

def saved_params
    params.permit(:user_id, :provider_id)
end

end
