describe('Check the Query Generator Form for fields related to SELECT and WHERE Clause', function() {
  
  // Load the myApp module, which contains the directive
  beforeEach( module('QueryGenApp') );

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  

  it('Checking SELECT Field', function() {

    $rootScope.fields   = ["time", "source_vn","destination_vn","source_port","destination_port","traffic"];
    
    // Compile a piece of HTML containing the directive
    var element = $compile('<jun-dropdown options="fields" class="fields"></jun-dropdown>')($rootScope);

    $rootScope.$digest();

    // Check that the compiled element contains the templated content
    expect( element.html() ).toContain("time");
    expect( element.html() ).toContain("source_vn");
    expect( element.html() ).toContain("destination_vn");
    expect( element.html() ).toContain("source_port");
    expect( element.html() ).toContain("destination_port");
    expect( element.html() ).toContain("traffic");

  });


  it('Checking Operators in WHERE Field', function() {

    $rootScope.operators  = ["=", "!="];
    
    var element = $compile('<jun-dropdown options="operators" class="operators" ></jun-dropdown>')($rootScope);

    $rootScope.$digest();

    expect( element.html() ).toContain("=");
    expect( element.html() ).toContain("!=");

  });


  it('Checking Conditional DropDown in WHERE Field', function() {

    $rootScope.conditions = ["AND", "OR"];
    
    var element = $compile('<jun-dropdown options="conditions" class="conditions" ></jun-dropdown>')($rootScope);

    $rootScope.$digest();

    // Check that the compiled element contains the templated content
    expect( element.html() ).toContain("AND");
    expect( element.html() ).toContain("OR");

  });


});