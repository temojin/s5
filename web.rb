require 'sinatra'
require 'lib/image_bucket'

get '/' do
	"Enter an S3 bucket name in the url"
end

get '/:bucket' do
	if request.xhr?
		ImageBucket.new(params[:bucket]).pick_one_url
	else
		erb :show
	end
end
