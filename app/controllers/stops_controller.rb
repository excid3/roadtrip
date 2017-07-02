class StopsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_stop, only: %w(show edit update destroy)
  before_action :set_trip

  # GET /stops
  # GET /stops.json
  def index
    redirect_to @trip
  end

  # GET /stops/1
  # GET /stops/1.json
  def show
  end

  # GET /stops/new
  def new
    @stop = Stop.new(trip_id: params[:trip_id])
  end

  # GET /stops/1/edit
  def edit
  end

  # POST /stops
  # POST /stops.json
  def create
    @stop = Stop.new(stop_params)

    respond_to do |format|
      if @stop.save
        format.html { redirect_to trip_stop_url(@trip, @stop), notice: 'Stop was successfully created.' }
        format.json { render :show, status: :created, location: @stop }
      else
        format.html { render :new }
        format.json { render json: @stop.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /stops/1
  # PATCH/PUT /stops/1.json
  def update
    respond_to do |format|
      if @stop.update(stop_params)
        format.html { redirect_to trip_stop_url(@trip, @stop), notice: 'Stop was successfully updated.' }
        format.json { render :show, status: :ok, location: @stop }
      else
        format.html { render :edit }
        format.json { render json: @stop.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stops/1
  # DELETE /stops/1.json
  def destroy
    @stop.destroy
    respond_to do |format|
      format.html { redirect_to trip_stops_url(@trip), notice: 'Stop was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def set_trip
      @trip = Trip.find(params[:trip_id])
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_stop
      @stop = Stop.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def stop_params
      params.require(:stop).permit(:trip_id, :name, :latitude, :longitude, :visited_at)
    end
end
