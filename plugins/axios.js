export default function ({ $axios, env }) {
  const baseUrl = env.baseUrl || 'https://apiquizz.smartsupport.pro'
  
  // Set base URL for all axios requests
  $axios.setBaseURL(baseUrl)
  
  // Add request interceptor to handle API calls
  $axios.onRequest(config => {
    // If URL is absolute (starts with http:// or https://)
    if (config.url.startsWith('http://') || config.url.startsWith('https://')) {
      // Replace old production URLs with current baseUrl
      if (config.url.includes('quizzhunter-api.tavakal.com')) {
        config.url = config.url.replace('https://quizzhunter-api.tavakal.com', baseUrl)
      }
      // Replace localhost:8080 with production baseUrl
      if (config.url.includes('localhost:8080')) {
        config.url = config.url.replace(/http:\/\/localhost:8080/g, baseUrl)
        return config
      }
    }
    
    // For relative URLs starting with /api, prepend baseUrl
    if (config.url.startsWith('/api')) {
      config.url = baseUrl + config.url
      return config
    }
    
    // For other relative URLs, ensure they have /api
    if (config.url.startsWith('/')) {
      if (!config.url.startsWith('/api')) {
        config.url = baseUrl + '/api' + config.url
      } else {
        config.url = baseUrl + config.url
      }
    } else {
      // No leading slash, add baseUrl and /api
      config.url = baseUrl + '/api/' + config.url
    }
    
    return config
  })
}

