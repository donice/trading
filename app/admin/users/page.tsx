'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { User } from '@/lib/models/user';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Mock user data for the prototype
  const mockUsers: User[] = [
    {
      _id: { toString: () => '1' } as any,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user',
      createdAt: new Date('2023-05-01'),
      isVerified: true,
    },
    {
      _id: { toString: () => '2' } as any,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'user',
      createdAt: new Date('2023-05-05'),
      isVerified: true,
    },
    {
      _id: { toString: () => '3' } as any,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      role: 'user',
      createdAt: new Date('2023-05-10'),
      isVerified: false,
    },
    {
      _id: { toString: () => '4' } as any,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'user',
      createdAt: new Date('2023-05-15'),
      isVerified: true,
    },
    {
      _id: { toString: () => '5' } as any,
      name: 'Daniel Wilson',
      email: 'daniel.wilson@example.com',
      role: 'admin',
      createdAt: new Date('2023-04-01'),
      isVerified: true,
    },
    {
      _id: { toString: () => '6' } as any,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'user',
      createdAt: new Date('2023-05-20'),
      isVerified: false,
    },
    {
      _id: { toString: () => '7' } as any,
      name: 'Robert Miller',
      email: 'robert.miller@example.com',
      role: 'user',
      createdAt: new Date('2023-05-25'),
      isVerified: true,
    },
    {
      _id: { toString: () => '8' } as any,
      name: 'Jennifer Taylor',
      email: 'jennifer.taylor@example.com',
      role: 'user',
      createdAt: new Date('2023-05-27'),
      isVerified: true,
    },
    {
      _id: { toString: () => '9' } as any,
      name: 'William Anderson',
      email: 'william.anderson@example.com',
      role: 'user',
      createdAt: new Date('2023-05-29'),
      isVerified: false,
    },
    {
      _id: { toString: () => '10' } as any,
      name: 'Elizabeth Thomas',
      email: 'elizabeth.thomas@example.com',
      role: 'user',
      createdAt: new Date('2023-05-30'),
      isVerified: true,
    },
    {
      _id: { toString: () => '11' } as any,
      name: 'James Jackson',
      email: 'james.jackson@example.com',
      role: 'user',
      createdAt: new Date('2023-06-01'),
      isVerified: true,
    },
    {
      _id: { toString: () => '12' } as any,
      name: 'Patricia White',
      email: 'patricia.white@example.com',
      role: 'user',
      createdAt: new Date('2023-06-02'),
      isVerified: false,
    },
  ];

  useEffect(() => {
    // In a real application, you would fetch users from the API
    // For the prototype, we'll use the mock data
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage all registered users on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="hidden md:table-cell">Registered On</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((user) => (
                        <TableRow key={user._id?.toString()}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {user.createdAt.toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {user.isVerified ? (
                              <Badge variant="outline" className="bg-green-500/20 text-green-500">
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500">
                                Pending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {filteredUsers.length > itemsPerPage && (
                <div className="mt-4 flex items-center justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}