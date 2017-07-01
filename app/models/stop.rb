class Stop < ApplicationRecord
  belongs_to :trip

  after_initialize :set_defaults

  def display_name
    name || [latitude, longitude].join(", ")
  end

  private

    def set_defaults
      self.visited_at ||= Time.zone.now
    end
end
