import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Phone, Mail, Globe, Building2, Calendar, Users } from 'lucide-react';
import AdminAuth from './AdminAuth';

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  website: string | null;
  phone: string;
  created_at: string;
}

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuth = sessionStorage.getItem('omnostock_admin_auth') === 'true';
    setIsAuthenticated(isAuth);
    
    if (isAuth) {
      fetchLeads();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch leads');
      }
      
      setLeads(data.leads || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Company', 'Website', 'Phone', 'Date'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        lead.id,
        `"${lead.name}"`,
        lead.email,
        `"${lead.company}"`,
        lead.website || '',
        lead.phone,
        formatDate(lead.created_at)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omnostock-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const goBack = () => {
    window.location.href = '/';
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    fetchLeads();
  };

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">Error loading leads</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchLeads} className="mr-2">Try Again</Button>
            <Button variant="outline" onClick={goBack}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={goBack} className="flex items-center gap-2 text-white hover:bg-gray-800">
                <ArrowLeft className="w-4 h-4" />
                Back to Site
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Omnostock Leads</h1>
                <p className="text-gray-300">Manage your form submissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="flex items-center gap-2 bg-gray-800 text-white">
                <Users className="w-4 h-4" />
                {leads.length} Total Leads
              </Badge>
              <Button onClick={exportToCSV} className="flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {leads.length === 0 ? (
          <Card className="border-2 border-gray-200">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No leads yet</h3>
              <p className="text-gray-700">Form submissions will appear here once visitors start filling out your contact form.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {leads.map((lead) => (
              <Card key={lead.id} className="border-2 border-gray-200 hover:border-gray-300 transition-colors bg-gray-50">
                <CardHeader className="pb-3 bg-white">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900 font-bold">{lead.name}</CardTitle>
                    <Badge className="flex items-center gap-1 bg-gray-900 text-white">
                      <Calendar className="w-3 h-3" />
                      {formatDate(lead.created_at)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-900" />
                      <a href={`mailto:${lead.email}`} className="text-blue-700 hover:text-blue-900 font-medium underline">
                        {lead.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-900" />
                      <span className="text-gray-900 font-medium">{lead.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-900" />
                      <a href={`tel:${lead.phone}`} className="text-blue-700 hover:text-blue-900 font-medium underline">
                        {lead.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-900" />
                      {lead.website ? (
                        <a 
                          href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-900 font-medium underline"
                        >
                          {lead.website}
                        </a>
                      ) : (
                        <span className="text-gray-600">No website</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;