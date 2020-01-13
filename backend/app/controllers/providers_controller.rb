class ProvidersController < ApplicationController
    def index
        render json: Provider.all
    end

    def show
        provider = Provider.find(params[:id])
        render json: provider
    end
end
