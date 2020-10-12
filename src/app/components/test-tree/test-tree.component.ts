import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { TestTree } from 'src/app/interfaces/test-tree';
import { TreeTestService } from 'src/app/services/treeTest/tree-test.service';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'test-tree',
  templateUrl: './test-tree.component.html',
  styleUrls: ['./test-tree.component.scss'],
})
export class TestTreeComponent implements OnInit {
  private transformer = (node: TestTree, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name.he,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );
  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // hasChild = (_: number, node: TestTree) =>
  //   !!node.children && node.children.length > 0;
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  constructor(private _treeTest: TreeTestService) {
    this.dataSource.data = this._treeTest.getTreeTest();
  }
  // public treeTest: TestTree
  ngOnInit(): void {
    // this._loadTreeTest()
  }

  // private _loadTreeTest() {
  //   this.treeTest = this._treeTest.getTreeTest()
  // }
}
