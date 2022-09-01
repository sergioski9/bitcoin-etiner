class CryptosController < ApplicationController
  before_action :set_bitcoin, only: [:show, :edit, :update, :destroy]

  def index
    @bitcoins = Crypto.all
  end

  def show
  end

  def new
    @bitcoin = Crypto.new
  end

  def create
    @bitcoin = Crypto.new(bitcoin_params)

    respond_to do |format|
      if @bitcoin.save
        format.html { redirect_to cryptos_url, notice: "Task was successfully created" }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @bitcoin.destroy
  end

  private

  def set_bitcoin
    @bitcoin = Crypto.find_by(hash: params[:hash])
  end

  def bitcoin_params
    params.require(:crypto).permit(:hash, :prev_block, :block_index, :time, :bits)
  end
end
