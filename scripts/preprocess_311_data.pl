#!/usr/bin/perl

# 
# This script pre-process the 311 raw data obtained from Vancouver open data. 
# The raw data is in csv format. 
# This script produces a set of csv files for the data which can be imported
# to a postgres database (using COPY facility).
# 
use strict;
use Text::CSV;
use Data::Dumper;

# Hash of case type and ids. Will be used to process the cases
my $CASETYPE_HR  = {};
my $LOCALAREA_HR = {};

sub process {
 my ( $dir_path, @files ) = @_;

 my %dept_list;
 my %div_list;
 my %casetype_list;
 foreach my $filename (@files) {
  my $file_path = $dir_path . $filename;
  print "Processing $file_path\n";

  open my $input_fh, '<:encoding(UTF-16le)', $file_path;
  my %new_dept_list = extract_field( $input_fh, 5 );
  seek $input_fh, 0, 0;    # rewind the filehandle to the beginning
  my %new_div_list = extract_field( $input_fh, 6 );
  seek $input_fh, 0, 0;    # rewind the filehandle to the beginning
  my %new_casetype_list = extract_field( $input_fh, 7 );
  close $input_fh;

  @dept_list{ keys %new_dept_list } =
    values %new_dept_list;    # merge the new list
  @div_list{ keys %new_div_list } = values %new_div_list;   # merge the new list
  @casetype_list{ keys %new_casetype_list } =
    values %new_casetype_list;                              # merge the new list
 }

 print "DEPARTMENT LIST: \n";
 print Dumper keys %dept_list;
 print "DIVISION LIST: \n";
 print Dumper keys %div_list;
 print "CASETYPE LIST: \n";
 print Dumper keys %casetype_list;
}

sub extract_field {
 my ( $input_fh, $field_idx ) = @_;

 my $csv = Text::CSV->new(
  { binary             => 1,     # Allow special character. Always set this
    auto_diag          => 1,     # Report irregularities immediately
    allow_loose_quotes => 1,
    sep_char           => ',',
  } );

 my %the_list;
 while ( my $row = $csv->getline($input_fh) ) {
  $the_list{ $row->[$field_idx] } = 1;
 }

 return %the_list;
}

sub collect_dept_and_division_and_localarea {
 my ( $dir_path, @files ) = @_;

 my $dept_data      = {};    # a hash reference
 my $div_data       = {};    # a hash reference
 my $localarea_data = {};    # a hash reference

 foreach my $filename (@files) {
  my $file_path = $dir_path . $filename;
  print "Processing $file_path for departments and divisions\n";

  open my $input_fh, '<:encoding(UTF-16le)', $file_path;
  extract_dept_data( $input_fh, $dept_data, $div_data, $localarea_data );
 }

 # print "DEPT DATA: ";
 # print Dumper $dept_data;
 # print "DIV DATA: ";
 # print Dumper $div_data;
 return ( $dept_data, $div_data, $localarea_data );
}

sub extract_dept_data {
 my ( $input_fh, $dept_data, $div_data, $localarea_data ) = @_;

 my $csv = Text::CSV->new(
  { binary             => 1,     # Allow special character. Always set this
    auto_diag          => 1,     # Report irregularities immediately
    allow_loose_quotes => 1,
    sep_char           => ',',
  } );

 while ( my $row = $csv->getline($input_fh) ) {

# Create hash of arrays that stores departments and the division
# The hash: keys are department name, values are array of divisions that belong to the dept
  push @{ $dept_data->{ $row->[5] } }, $row->[6]
    unless grep { $_ eq $row->[6] } @{ $dept_data->{ $row->[5] } };

# Create hash of arrays that stores divisions and the case types handled by a division
# The hash: keys are division name, values are array of case types
  push @{ $div_data->{ $row->[6] } }, $row->[7]
    unless grep { $_ eq $row->[7] } @{ $div_data->{ $row->[6] } };

  # Create a hash that stores local area
  # The hash: keys are local area id, values are local area name
  push @{ $localarea_data->{ $row->[10] } }, $row->[10]
    unless grep { $_ eq $row->[10] } @{ $localarea_data->{ $row->[10] } };

 }
 return;
}

sub collect_cases {
 my ( $dir_path, @files ) = @_;

 my $cases = {};
 foreach my $filename (@files) {
  my $file_path = $dir_path . $filename;
  print "Processing $file_path for cases\n";

  open my $input_fh, '<:encoding(UTF-16le)', $file_path;
  extract_case_data( $input_fh, $cases );
 }

 return $cases;
}

sub extract_case_data {
 my ( $input_fh, $cases ) = @_;

 my $csv = Text::CSV->new(
  { binary             => 1,     # Allow special character. Always set this
    auto_diag          => 1,     # Report irregularities immediately
    allow_loose_quotes => 1,
    sep_char           => ',',
  } );

 my $count = 0;                 # counter
 while ( my $row = $csv->getline($input_fh) ) {
  if ( $count == 0 ) {          # Skip header
   $count++;
   next;
  }
  my $caseId =
      sprintf( "%04d", $row->[0] )
    . sprintf( "%02d", $row->[1] )
    . sprintf( "%02d", $row->[2] )
    . sprintf( "%02d", $row->[3] )
    . sprintf( "%02d", $row->[4] )
    . sprintf( "%05d", $count++ );
  my $caseDate =
      sprintf( "%04d", $row->[0] ) . '/'
    . sprintf( "%02d", $row->[1] ) . '/'
    . sprintf( "%02d", $row->[2] );
  my $caseTime =
    sprintf( "%02d", $row->[3] ) . ':' . sprintf( "%02d", $row->[4] );
  my $caseHundredBlock = $row->[8];
  my $caseAddress      = $row->[9];
  my $caseArea         = ( $row->[10] eq '' ? 'NA' : $row->[10] );
  my $caseType         = ( $row->[7] eq '' ? 'NA' : $row->[7] );
  push @{ $cases->{$caseId} },
    ( $caseId,      $caseDate, $caseTime, $caseType, $caseHundredBlock,
      $caseAddress, $caseArea );
 }

 return;
}

# write departments data to a file in CSV format.
# Each entry in separate line.
sub write_depts_data_to_file {
 my ( $dept_out_filename, $div_out_filename, $casetype_out_filename, $depts_hr,
      $divs_hr
 ) = @_;

 # Open filehandles
 open my $dept_out_fh, '>:encoding(UTF-8)', $dept_out_filename;
 open my $div_out_fh,  '>:encoding(UTF-8)', $div_out_filename;
 open my $ct_out_fh,   '>:encoding(UTF-8)', $casetype_out_filename;

 my $dept_id = 1;
 my $div_id  = 1;
 my $ct_id   = 1;
 foreach my $dept ( sort keys %$depts_hr ) {
  print "DEPT ID: $dept_id - DEPT NAME: $dept\n";
  print $dept_out_fh "$dept_id,$dept\n";
  foreach my $div ( @{ $depts_hr->{$dept} } ) {
   print "\tDIV ID: $div_id - DEPT ID: $dept_id - DIV NAME: $div\n";
   print $div_out_fh "$div_id,$dept_id,$div\n";
   my $div_casetypes = $divs_hr->{$div};
   foreach my $ct ( sort @{$div_casetypes} ) {
    $CASETYPE_HR->{$ct} = $ct_id;
    print "\t\tCASETYPE ID:  $ct_id - DIV ID: $div_id - CASETYPE NAME: $ct\n";
    print $ct_out_fh "$ct_id,$ct,$div_id\n";
    $ct_id++;
   }
   $div_id++;
  }
  $dept_id++;
 }

 # close filehandles
 close $dept_out_fh;
 close $div_out_fh;
 close $ct_out_fh;

 return;
}

sub write_localareas_to_file {
 my ( $filename, $locarea_hr ) = @_;
 open my $output_fh, '>:encoding(UTF-8)', $filename;

 my $locarea_dbid = 1;
 foreach my $locarea ( keys %$locarea_hr ) {
  $locarea =~ s/^$/NA/;
  $LOCALAREA_HR->{$locarea} = $locarea_dbid;
  print $output_fh "$locarea_dbid,$locarea\n";
  $locarea_dbid++;
 }

 close $output_fh;
 return;
}

# write array to a file. Each entry in separate line.
sub write_cases_to_file {
 my ( $filename, $cases_hr ) = @_;
 open my $output_fh, '>:encoding(UTF-8)', $filename;

 my $case_dbid = 1;
 foreach my $caseId ( keys %$cases_hr ) {
  my @case_details = @{ $cases_hr->{$caseId} };
  my $ct_id =
    $CASETYPE_HR->{ $case_details[3] }; # Array index 3 corresponds to case type
  my $la_id = $LOCALAREA_HR->{ $case_details[6] }
    ;                                   # Array index 6 corresponds to case type
  print $output_fh
"$case_dbid,$case_details[0],$case_details[1],$case_details[2],$ct_id,$la_id,$case_details[4],$case_details[5]\n";
  $case_dbid++;
 }
 close $output_fh;
 return;
}

# write array to a file. Each entry in separate line.
sub write_array_to_file {
 my ( $filename, @data_arr ) = @_;
 open my $output_fh, '>:encoding(UTF-8)', $filename;
 s/^$/NA/ for @data_arr;    # transform empty value in the array to 'NA'
 print $output_fh join( "\n", @data_arr );

 close $output_fh;
 return;
}

# Write hash values to a file. Value of a hash entry is an array.
# Separate array items with commas
sub write_to_file {
 my ( $filename, $data_hr ) = @_;
 open my $output_fh, '>:encoding(UTF-8)', $filename;
 foreach my $key ( keys %$data_hr ) {
  my $val_ar = $data_hr->{$key};    # get the hash value, which is an array
  s/^$/NA/ for @$val_ar;            # transform empty value in the array to 'NA'

  print $output_fh join( ',', @$val_ar ), "\n";
 }

 close $output_fh;

 return;
}

sub write_depts_divs_to_file {
 my ($depts) = @_;

# Depts is a hash where key = dept name, value = array of divisions belonging to the dept

 return;
}

my @files = ( 
              '201201CaseLocationsDetails.csv',
              '201202CaseLocationsDetails.csv',
              '201203CaseLocationsDetails.csv',
              '201204CaseLocationsDetails.csv',
              '201205CaseLocationsDetails.csv',
              '201206CaseLocationsDetails.csv',
              '201207CaseLocationsDetails.csv',
              '201208CaseLocationsDetails.csv',
              '201209CaseLocationsDetails.csv',
              '201210CaseLocationsDetails.csv',
              '201211CaseLocationsDetails.csv',
              '201212CaseLocationsDetails.csv',
              '201301CaseLocationsDetails.csv',
              '201302CaseLocationsDetails.csv',
              '201303CaseLocationsDetails.csv',
              '201304CaseLocationsDetails.csv',
              '201305CaseLocationsDetails.csv',
              '201306CaseLocationsDetails.csv',
              '201307CaseLocationsDetails.csv',
              '201308CaseLocationsDetails.csv',
              '201309CaseLocationsDetails.csv',
              '201310CaseLocationsDetails.csv',
              '201311CaseLocationsDetails.csv',
              '201312CaseLocationsDetails.csv',
              '201401CaseLocationsDetails.csv', 
              '201402CaseLocationsDetails.csv', 
              '201403CaseLocationsDetails.csv', 
              '201404CaseLocationsDetails.csv', 
              '201405CaseLocationsDetails.csv', 
);

my ( $depts_hr, $divs_hr, $localareas_hr ) =
  collect_dept_and_division_and_localarea(
                          'C:\\SwiftAvenue_World\\Projects\\311_rawdata\\csv\\',
                          @files, );

my ($cases_hr) =
  collect_cases( 'C:\\SwiftAvenue_World\\Projects\\311_rawdata\\csv\\', @files,
  );

write_depts_data_to_file( 'depts.csv', 'divs.csv', 'casetypes.csv', $depts_hr,
                          $divs_hr );

write_localareas_to_file( 'local_area.csv', $localareas_hr );

write_cases_to_file( 'cases.csv', $cases_hr );

1;
