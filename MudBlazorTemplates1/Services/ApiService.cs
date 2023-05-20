using System.Net.Http.Headers;

namespace MudBlazorTemplates1.Services
{
    public class ApiService
    {
        public HttpClient HttpClient { get; private set; }
        public ApiService(IHttpClientFactory httpClientFactory)
        {
            HttpClient = httpClientFactory.CreateClient("api");
        }
    }
}
